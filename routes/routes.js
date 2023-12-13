const { Router } = require("express");
// const connection = require('../config/database');
const User = require('../schemas/user.schema');
const passport = require('passport');
const controller = require('../schemas/authController');
const roleMiddleware = require('./roleMiddleware');
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;
const isDriver = require('./authMiddleware').isDriver;
const authenticateToken = require('./authMiddleware').authenticateToken;
const jwt = require('jsonwebtoken');

const secretKey = 'mySecretKey';


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

// router.get('/protected-route', (req, res, next) => {
//     if (req.isAuthenticated()) {
//         res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
//     } else {
//         res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
//     }
// });

//--------------------------------POST ROUTES-------------------------

router.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin,
        driver: req.body.driver
      }
    // Проверка, что пользователь с таким логином существует и пароль верный
    if (!user[username] || user[username] !== password) {
      return res.status(401).json({ message: 'Неправильный логин или пароль' });
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
          token
        });
      });
  });

//  router.get('/profile', authenticateToken, (req, res) => {
//     // Получение данных пользователя из объекта запроса
//     const { username } = req.user;
//     res.json({ username });
//   });

router.post('/register', (req, res) => {
    // Получить данные пользователя из запроса
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      admin: req.body.admin,
      driver: req.body.driver
    })
    user.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Ошибка при сохранении пользователя в базе данных');
        } else {
          // Создать токен
          jwt.sign({ user }, 'secretkey', (err, token) => {
            res.json({
              token
            });
          });
        }
      });
  });
  

// router.post('/login', 
// // controller.login
// passport.authenticate('local', {
//     successRedirect: '/protected-route',
//     failureRedirect: '/login'
  
// })
// );

// router.post('/register', (req, res, next) => {
//     const user = new User();
// user.username = req.body.username;
// user.password = req.body.password;
// user.admin = req.body.admin === 'true';
// user.driver = req.body.driver === 'true';

// user.save(function(err) {
//   if (err) {
//     console.log(err);
//     res.status(500).send('Error creating user');
//   } else {
//     console.log('User created successfully!');
//     if (user.admin && !user.driver) {
//       res.redirect('/admin');
//     } else if (!user.admin && user.driver) {
//       res.redirect('/autodriver');
//     } else {
//       res.redirect('/autouser');
//     }
// }});
// });

//-------------------------------USER ROUTES------------------------

router.get('/autouser', (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isUserPage: true,
    });
});

//-------------------------------DRIVER ROUTES------------------------

router.get('/autodriver', (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isUserPage: true,
        isDriverPage: true,
    });
});

//-------------------------------ADMIN ROUTES------------------------

router.get('/admin', (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isAdminPage: true,
    });
});

router.get('/adminbus', isAdmin, (req, res, next) => {
    res.render('buses', {
        title: 'Автобусы',
        isAdminPage: true,
    });
});

module.exports = {
    router
};