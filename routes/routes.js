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

var account = mongoose.model('People_Collection', accountSchema);

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
    var person = account.findById(req.params.id);
    res.render('account', {
        config,
        person
    });
}

exports.createaccount = (req, res) => {
    var encryptPass = bcrypt.hash(req.body.password)
    var account = new account({
        username: req.body.username,
        password: encryptPass,
        email: req.body.email,
        age: req.body.age,
        q1: req.body.q1,
        q2: req.body.q2,
        q4: req.body.q3
    });
    account.save((err, account) => {
        if(err) return console.error(err)
        console.log(req.username + "added");
    });
    req.session.user = {
        isAuthenticated: true,
        username: account.username
    }
    res.redirect('/');
}

exports.editaccount = (req, res) => {
    account.findById(req.params.id, function (err, account) {
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
            username: account.username
        }
    });
    res.redirect('/user/:' + req.params.id);
};

exports.authenticate = (res, req) => {
    var account = account.find({username: req.body.username});
    var isAuth = bcrypt.compare(account.password, req.body.password, (err, res) => {
        if (err) console.log(err)
        if (res) console.log(res)
    });
    if(isAuth) {
        req.session.user = {
            isAuthenticated: true,
            username: account.username
        }
        res.redirect('/:' + account.id)
    } else {
        res.redirect('/');
    }
};