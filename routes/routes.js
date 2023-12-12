const { Router } = require("express");
const connection = require('../config/database');
const User = connection.models.Users;
const passport = require('passport');
const controller = require('../schemas/authController');
const roleMiddleware = require('./roleMiddleware');
const authMiddleware = require('./authMiddleware');

const router = Router();


//-------------------------------UNAUTHORIZED USERS' ROUTES------------------------

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Главная',
    });
});

router.get('/buses', (req, res, next) => {
    res.render('buses', {
        title: 'Автобусы',
    });
});

router.get('/trolleybuses', (req, res, next) => {
    res.render('trolleybuses', {
        title: 'Троллейбусы',
    });
});

router.get('/trams', (req, res, next) => {
    res.render('trams', {
        title: 'Трамваи',
    });
});

//-----------------------------------AUTHORIZATION ROUTES---------------------------

router.get('/login', (req, res, next) => {
    res.render('login', {
        title: 'Войти',
        isLoginPage: true,
    });
});

router.get('/register', (req, res, next) => {
    res.render('register', {
        title: 'Регистрация',
        isLoginPage: true,
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

//--------------------------------PROTECTED ROUTE-------------------------

router.get('/protected-route', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
    } else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
});

//--------------------------------POST ROUTES-------------------------

router.post('/login', 
// controller.login
passport.authenticate('local', {
    successRedirect: '/protected-route',
    failureRedirect: '/login'
  
})
);

router.post('/register', controller.registration);

//-------------------------------USER ROUTES------------------------

router.get('/autouser', roleMiddleware(["USER"]), (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isUserPage: true,
    });
});

//-------------------------------DRIVER ROUTES------------------------

router.get('/autodriver', roleMiddleware(["DRIVER"]), (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isUserPage: true,
        isDriverPage: true,
    });
});

//-------------------------------ADMIN ROUTES------------------------

router.get('/admin', roleMiddleware(["ADMIN"]), (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isAdminPage: true,
    });
});

router.get('/adminbus', roleMiddleware(["ADMIN"]), (req, res, next) => {
    res.render('buses', {
        title: 'Автобусы',
        isAdminPage: true,
    });
});

module.exports = {
    router
};