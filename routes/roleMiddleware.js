// const User = require('../schemas/user.schema');
// const jwt = require('jsonwebtoken')
// const {secret} = require('../config/config')

// module.exports.isAuth = (req, res, next) => {
//     if(req.isAuthenticated()) {
//         next();
//     } 
//     else {
//         res.status(401).json({msg: 'Вы не авторизованы и не можете просматривать данный ресурс'});
//     }
// }

// module.exports = function (roles) {
//     return function (req, res, next) {
//         if (req.method === "OPTIONS") {
//             next()
//         }

//         try {
//             console.log(req.headers.Authorization);
//             const token = req.headers.Authorization.split(' ')[1]
//             if (!token) {
//                 return res.status(403).json({message: "Пользователь не авторизован"})
//             }
//             const {roles: userRoles} = jwt.verify(token, secret)
//             let hasRole = false
//             userRoles.forEach(role => {
//                 if (roles.includes(role)) {
//                     hasRole = true
//                 }
//             })
//             if (!hasRole) {
//                 return res.status(403).json({message: "У вас нет доступа"})
//             }
//             next();
//         } catch (e) {
//             console.log(e)
//             return res.status(403).json({message: "Пользователь не авторизован"})
//         }
//     }
// };