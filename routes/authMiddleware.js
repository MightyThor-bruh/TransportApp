
export function isAuth(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } 
    else {
        res.render('notAuth');
    }
}

export function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.admin) {
        next();
    } 
    else {
        res.render('notAuth');
    }
}

export function isDriver(req, res, next) {
    if(req.isAuthenticated() && req.user.driver) {
        next();
    } 
    else {
        res.render('notAuth');
    }
}
