var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const cookieParser = require('cookie-parser');
var expressSession = require('express-sessions');

const config = require('../config.json');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var accountSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: String,
    q1: String,
    q2: String,
    q3: String,
    avatar: {
        eyes: Number,
        nose: Number,
        mouth: Number,
        color: String
    }
});

var Account = mongoose.model('People_Collection', accountSchema);

exports.api = (req, res) => {
    Account.find((err, accts) => {
        var returnDoc = {
            Ages: {
                mean: 0,
                median: 0,
                upperQuart: 0,
                lowerQuart: 0,
                min: 0,
                max: 0,
            },
            Q1: {
                Red: 0,
                Yellow: 0,
                Blue: 0
            },
            Q2: {
                Zero: 0,
                One: 0,
                Two: 0,
                Three: 0,
                FourPlus: 0,
            },
            Q3: {
                male: 0,
                female: 0,
                nonBinary: 0,
                other: 0
            }
        };
        var ageCollection = [];
        var siblingCollection = [];
        for (const doc in accts) {
            if(accts[doc].age) {
                ageCollection.push(accts[doc].age);
            }
            if(accts[doc].q1) {
                switch (accts[doc].q1.toLowerCase()) {
                    case 'red':
                        returnDoc.Q1.Red += 1;
                        break;
                    case 'yellow':
                        returnDoc.Q1.Yellow += 1;
                        break;
                    case 'blue':
                        returnDoc.Q1.Blue += 1;
                        break;
                    default:
                        break;
                }
            }
            if(accts[doc].q2) {
                switch (accts[doc].q2.toLowerCase()) {
                    case 'zero':
                        returnDoc.Q2.Zero += 1;
                        break;
                    case 'one':
                        returnDoc.Q2.One += 1;
                        break;
                    case 'two':
                        returnDoc.Q2.Two += 1;
                        break;
                    case 'three':
                        returnDoc.Q2.Three += 1;
                        break;
                    case 'fourplus':
                        returnDoc.Q2.FourPlus += 1;
                    default:
                        break;
                }
            }
            if(accts[doc].q3) {
                switch (accts[doc].q3.toLowerCase()) {
                    case 'male':
                        returnDoc.Q3.male += 1;
                        break;
                    case 'female':
                        returnDoc.Q3.female += 1;
                        break;
                    case 'non-binary':
                        returnDoc.Q3.nonBinary += 1;
                        break;
                    default:
                        returnDoc.Q3.other += 1;
                        break;
                }
            }
        }
        ageCollection.sort(function(a, b){return a-b});
        console.log(ageCollection[Math.floor(ageCollection.length / 2)]);
        returnDoc.Ages.median = parseInt(ageCollection[Math.floor(ageCollection.length / 2)]);
        returnDoc.Ages.lowerQuart = parseInt(ageCollection[Math.floor(ageCollection.length / 4)]);
        returnDoc.Ages.upperQuart = parseInt(ageCollection[Math.floor((ageCollection.length / 4) * 3)]);
        returnDoc.Ages.max = parseInt(ageCollection[ageCollection.length - 1]);
        returnDoc.Ages.min = parseInt(ageCollection[0]);
        for (const age of ageCollection) {
            returnDoc.Ages.mean += parseInt(age);
        }
        
        returnDoc.Ages.mean = Math.floor(returnDoc.Ages.mean / ageCollection.length);

        res.send(returnDoc);
    });
}

//Home Renderer
exports.home = (req, res) => {
    var hideSignIn;
    var hideAccount;
    if(req.cookies.remembered) {
        let cookie = JSON.parse(req.cookies.remembered);
        req.session.user = cookie;
    }
    console.log(req.session.user);
    
    if(req.session.user && req.session.user.isAuthenticated) {
        hideSignIn = "hideSignIn";
        hideAccount = "";
    } else {
        hideSignIn = "";
        hideAccount = "hideAccount";
    }
    res.render('index', {
        config,
        hideAccount,
        hideSignIn
    });
}

//Sign up and login renderer
exports.signUpLogIn = (req, res) => {
    var hideSignIn;
    var hideAccount;
    if(req.session.user && req.session.user.isAuthenticated) {
        hideSignIn = "hideSignIn";
        hideAccount = "";
    } else {
        hideSignIn = "";
        hideAccount = "hideAccount";
    }
    res.render('login', {
        config,
        hideAccount,
        hideSignIn,
        validLogin: req.query.valid
    });
}


exports.user = (req, res) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        Account.findById(req.session.user.id, (err, fres) => {
            res.render('account', {
                config,
                person: fres,
                hideAccount: "hideAccount",
                hideSignIn: "hideSignIn"
            });
        });
    } else {
        res.redirect('/');
    }
}

exports.createaccount = (req, res) => {
     bcrypt.hash(req.body.password, null, null, (err, hash) => {
        var encryptPass = hash;
        var account = new Account({
            username: req.body.username.toLowerCase(),
            password: encryptPass,
            email: req.body.email.toLowerCase(),
            age: req.body.age,
            q1: req.body.q1.toLowerCase(),
            q2: req.body.q2.toLowerCase(),
            q3: req.body.q3.toLowerCase(),
            avatar: {
                eyes: parseInt(req.body.eyesOption),
                nose: parseInt(req.body.noseOption),
                mouth: parseInt(req.body.mouthOption),
                color: req.body.colorOption
            }
        });
        account.save(function (err, account) {
            if(err) return console.error(err)
            console.log(req.body.username + "added");
        });
        req.session.user = {
            isAuthenticated: true,
            username: account.username,
            id: account.id
        }
        res.redirect('/');
    });
}

exports.editaccount = (req, res) => {
    Account.findById(req.session.user.id, function (err, account) {
        if (err) return console.error(err);
        console.log(account);
        
        if(account) {
            if(req.body.Password === "") {
                if (err) return console.error(err);
                    console.log(req.body);
                    account.name = req.body.Username.toLowerCase();
                    account.age = req.body.Age;
                    account.email = req.body.Email.toLowerCase();
                    
                    account.q1 = req.body.Q1.toLowerCase();
                    account.q2 = req.body.Q2.toLowerCase();
                    account.q3 = req.body.Q3.toLowerCase();
                    account.avatar.eyes = parseInt(req.body.eyesOption);
                    account.avatar.nose = parseInt(req.body.noseOption);
                    account.avatar.mouth = parseInt(req.body.mouthOption);
                    account.avatar.color = req.body.colorOption;
                    account.save(function (err, account) {
                        if (err) return console.error(err);
                        console.log(req.body.Username + ' updated');
                        req.session.user = {
                            isAuthenticated: true,
                            username: account.username,
                            id: account.id
                        }
                    });
            } else {
                bcrypt.hash(req.body.Password, null, null, (err, result) => {
                    if (err) return console.error(err);
                    console.log(req.body);
                    account.name = req.body.Username.toLowerCase();
                    account.age = req.body.Age;
                    account.password = result;
                    account.email = req.body.Email.toLowerCase();
                    
                    account.q1 = req.body.Q1.toLowerCase();
                    account.q2 = req.body.Q2.toLowerCase();
                    account.q3 = req.body.Q3.toLowerCase();
                    account.avatar.eyes = parseInt(req.body.eyesOption);
                    account.avatar.nose = parseInt(req.body.noseOption);
                    account.avatar.mouth = parseInt(req.body.mouthOption);
                    account.avatar.color = req.body.colorOption;
                    account.save(function (err, account) {
                        if (err) return console.error(err);
                        console.log(req.body.Username + ' updated');
                        req.session.user = {
                            isAuthenticated: true,
                            username: account.username,
                            id: account.id
                        }
                    });
                });
            }

        }
    });
    res.redirect('/account');
};

exports.authenticate = (req, res) => {
    Account.find({username: req.body.username.toLowerCase()}, (err, fres) => {
        console.log("Account ", fres);
        if (err) console.log(err);
        console.log("Entered Pass ", req.body.password);
        if(fres[0]) {
            bcrypt.compare(req.body.password, fres[0].password, (err, ares) => {
                if (err) {
                    console.log(err);  
                    console.log("Error!");
                } 
                if (ares) {
                    console.log(ares); 
                    console.log("Response!");
                }
                if(ares) {
                    req.session.user = {
                        isAuthenticated: true,
                        username: fres[0].username,
                        id: fres[0].id
                    }
                    if(req.body.remember === "on") {
                        res.cookie("remembered", `{"isAuthenticated": "true","username": "${fres[0].username}","id": "${fres[0].id}"}`, {maxAge: 99999999999999});
                    }
                    res.redirect('/account')
                } else {
                    res.redirect('/login?valid=isNotValid');
                }
            });
        } else {
            res.redirect('/login?valid=isNotValid');
        }
    });
};

exports.logOut = (req, res) => {
    req.session.destroy();
    res.clearCookie('remembered');
    res.redirect('/');
};