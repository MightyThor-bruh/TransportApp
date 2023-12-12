// const User = require('./user.schema.js');
// const Role = require('./role.schema.js');
// const bcrypt = require('bcryptjs');
// const { validationResult } = require('express-validator');
// const {secret} = require("../config/config");
// // const jwt = require('jsonwebtoken');

// // const generateAccessToken = (id, roles) => {
// //     const payload = {
// //         id,
// //         roles
// //     }
// //     return jwt.sign(payload, secret, {expiresIn: "24h"} )
// // }

// class authController {
//     async registration(req, res) {
//         try {
//             // const errors = validationResult(req)
//             // if (!errors.isEmpty()) {
//             //     return res.status(400).json({message: "Ошибка при регистрации", errors})
//             // }
//             const {username, password, admin, driver} = req.body;
//             const candidate = await User.findOne({username})
//             if (candidate) {
//                 return res.status(400).json({message: "Пользователь с таким именем уже существует"})
//             }
//             const hashPassword = bcrypt.hashSync(password, 7);
//             // const userRole = await Role.findOne({value: "USER"})
//             const user = new User({username, password: hashPassword, admin, driver})
//             await user.save()
//             return res.send('<h1>Регистрация прошла успешно</h1><p><a href="/login">Войти</a></p>');
//         } catch (e) {
//             console.log(e)
//             res.status(400).json({message: 'Registration error'})
//         }
//     }
// }

//     // async login(req, res) {
//     //     try {
//     //         const {username, password} = req.body
//     //         const user = await User.findOne({username})
//     //         if (!user) {
//     //             return res.status(400).json({message: `Пользователь ${username} не найден`})
//     //         }
//     //         const validPassword = bcrypt.compareSync(password, user.password)
//     //         if (!validPassword) {
//     //             return res.status(400).json({message: `Введен неверный пароль`})
//     //         }
//     //         const token = generateAccessToken(user._id, user.role)
//     //         return res.json({token})
//     //     } catch (e) {
//     //         console.log(e)
//     //         res.status(400).json({message: 'Login error'})
//     //     }
//     // }

// }

// module.exports = new authController()