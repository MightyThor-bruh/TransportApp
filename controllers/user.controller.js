import passport from 'passport';
import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';

const userSigninController = (req, res, next) => {
    const User = db.getModel(DB_COLLECTIONS.USERS);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin,
        driver: req.body.driver
    });

    user.save().then((a, b) => {
        console.log('User created successfully!');
        if (user.admin && !user.driver) {
            res.redirect('/admin');
        } else if (!user.admin && user.driver) {
            res.redirect('/autodriver');
        } else {
            res.redirect('/autouser');
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Error creating user');
    }).finally(() => {
        console.log(`User registration process finished!`);
    });
}

const userLoginController = passport.authenticate('local', {
    successRedirect: '/protected-route',
    failureRedirect: '/login'
})

const loginPageController = (req, res, next) => {
    res.render('login', {
        title: 'Войти',
        isLoginPage: true,
    });
}

const signinPageController = (req, res, next) => {
    res.render('register', {
        title: 'Регистрация',
        isLoginPage: true,
    });
}

const logoutPageController = (req, res, next) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
    });
}

const userPageController = (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isUserPage: true,
    });
}

export {
    userSigninController,
    userLoginController,
    loginPageController,
    signinPageController,
    logoutPageController,
    userPageController
}