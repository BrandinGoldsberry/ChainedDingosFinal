var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
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
    q3: String
});

var Account = mongoose.model('People_Collection', accountSchema);

//Home Renderer
exports.home = (req, res) => {
    res.render('index', {
        config
    });
}

//Sign up and login renderer
exports.signUpLogIn = (req, res) => {
    res.render('login', {
        config
    });
}


exports.user = (req, res) => {
    var person = Account.findById(req.params.id);
    res.render('account', {
        config,
        person
    });
}

exports.createaccount = (req, res) => {
     bcrypt.hash(req.body.password, null, null, (err, hash) => {
        var encryptPass = hash;
        var account = new Account({
            username: req.body.username,
            password: encryptPass,
            email: req.body.email,
            age: req.body.age,
            q1: req.body.q1,
            q2: req.body.q2,
            q4: req.body.q3
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
    Account.findById(req.params.id, function (err, account) {
        if (err) return console.error(err);
        accountAcc = req.params.id;
        account.name = req.body.name;
        account.age = req.body.age;
        var encryptPass = bcrypt.hash(req.body.password)
        account.password = encryptPass;
        account.email = req.body.email;
        account.q1 = req.body.q1;
        account.q2 = req.body.q2;
        account.q3 = req.body.q3;

        account.save(function (err, account) {
            if (err) return console.error(err);
            console.log(req.body.name + ' updated');
        });
        req.session.user = {
            isAuthenticated: true,
            username: account.username,
            id: account.id
        }
    });
    res.redirect('/user/:' + req.params.id);
};

exports.authenticate = (req, res) => {
    Account.find({username: req.body.username}, (err, fres) => {
        console.log("Account ", fres);
        if (err) console.log(err);
        console.log("Entered Pass ", req.body.password);
        
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
                res.redirect('/user/:' + fres[0].id)
            } else {
                res.redirect('/login');
            }
        });
    });
};

exports.logOut = (res, req) => {
    
};