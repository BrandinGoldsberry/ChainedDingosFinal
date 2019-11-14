const express = require("express");
const pug = require("pug");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require('./routes/routes.js');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname+"/views");
app.use(express.static(path.join(__dirname+"/public")));
app.use(expressSession ({
    secret: 'aslkdm;salkdm;saldkwrrjewr983292398',
    saveUninitialized: true,
    resave: true,
}));

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

//HTTP REQUESTS----------------------------------
app.get('/', routes.home);
app.post('/createAccount', urlencodedParser, routes.createaccount);
app.get('/login', routes.signUpLogIn);
app.post('/auth', urlencodedParser, routes.authenticate);
app.get('/user/:id', routes.user);
//-----------------------------------------------

app.listen(3000);