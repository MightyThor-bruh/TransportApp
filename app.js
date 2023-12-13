const express = require('express');
const {PORT, DB_NAME} = require('./constants/constants');
const { router } = require('./routes/routes');
const path = require('path');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./config/database');
require('./config/passport')
require('dotenv').config();


//create app
const app = express();

//middleware for parsing http-responses

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// handlebars engine init

app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

//using public folder for css

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);

//session setup

app.use(session({
    secret: 'tangerine',
    resave: false,
    saveUninitialized: false
}));
  
//passport setup

// app.use(passport.initialize());
// app.use(passport.session());

//using router for specified routes
app.use(router);

//app initialization

async function init() {

    try{
        await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
    }
    catch(e) {
        console.log(`Database connection error`, e);
    }

    const server = app.listen(PORT, () => {
        console.log(`Server has been started at http://localhost:${PORT}`);
    });
}

init();