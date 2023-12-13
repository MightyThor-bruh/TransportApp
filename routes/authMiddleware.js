
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
