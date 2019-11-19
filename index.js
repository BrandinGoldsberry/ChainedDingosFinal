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
    cookie: {maxAge: 999999999999999}
}));
app.use(cookieParser('BigBoi5'));

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

//HTTP REQUESTS----------------------------------
app.get('/', routes.home);
app.post('/createAccount', urlencodedParser, routes.createaccount);
app.post('/editAccount', urlencodedParser, routes.editaccount);
app.get('/login', routes.signUpLogIn);
app.post('/authenticate', urlencodedParser, routes.authenticate);
app.get('/account', routes.user);
//-----------------------------------------------

app.listen(3000);