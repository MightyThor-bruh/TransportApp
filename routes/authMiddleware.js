
export function isAuth(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } 
    else {
        res.status(401).json({msg: 'Вы не авторизованы и не можете просматривать данный ресурс'});
    }
}

export function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.admin) {
        next();
    } 
    else {
        res.status(401).json({msg: 'Вы не авторизованы и не можете просматривать данный ресурс'});
    }
}

export function isDriver(req, res, next) {
    if(req.isAuthenticated() && req.user.driver) {
        next();
    } 
    else {
        res.status(401).json({msg: 'Вы не авторизованы и не можете просматривать данный ресурс'});
    }
}
