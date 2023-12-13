// const jwt = require('jsonwebtoken')
// const {secret} = require('../config/config')

// module.exports = function (req, res, next) {
//     if (req.method === "OPTIONS") {
//         next()
//     }

//     try {
//         const token = req.headers.authorization.split(' ')[1]
//         if (!token) {
//             return res.status(403).json({message: "Пользователь не авторизован"})
//         }
//         const decodedData = jwt.verify(token, secret)
//         req.user = decodedData
//         next()
//     } catch (e) {
//         console.log(e)
//         return res.status(403).json({message: "Пользователь не авторизован"})
//     }
// };

module.exports.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } 
    else {
        res.status(401).json({msg: 'Вы не авторизованы и не можете просматривать данный ресурс'});
    }
}

module.exports.isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin) {
        next();
    } 
    else {
        res.status(401).json({msg: 'Вы не авторизованы и не можете просматривать данный ресурс'});
    }
}

module.exports.isDriver = (req, res, next) => {
    if(req.isAuthenticated() && req.user.driver) {
        next();
    } 
    else {
        res.status(401).json({msg: 'Вы не авторизованы и не можете просматривать данный ресурс'});
    }
}
const jwt = require('jsonwebtoken');

const secretKey = 'mySecretKey';

function authenticateToken(req, res, next) {
    // Получение заголовка Authorization с токеном
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      // Токен не найден
      return res.status(401).json({ message: 'Невалидный токен' });
    }
  
    // Проверка валидности токена
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Невалидный токен' });
      }
      console.log(decoded)
      // Сохранение декодированных данных токена в объекте запроса
      req.user = decoded;
      next();
    });
  }