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