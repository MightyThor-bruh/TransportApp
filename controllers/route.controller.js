import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';

const transportRouteController = (req, res, next) => {
    const transportType = req.params && req.params.type;
    const TransportRouteModel = db.getModel(DB_COLLECTIONS.ROUTES);
    TransportRouteModel.find({type: `${transportType}`}).exec().then((data) => {
        res.render('transport', {
            title: transportType === 'bus' ? "Автобус" : ( transportType === 'troll' ? "Троллейбус" : "Трамвай"),
            text: `Расписание ${transportType === 'bus' ? "автобуса" : ( transportType === 'troll' ? "троллейбуса" : "трамвая")}`,
            transport: data
        });
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error getting routes');
    }).finally(() => {
        console.log(`Routes List send!`);
    });
}




const protectedRouteController = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
    } else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
}

export {
    transportRouteController, 
    protectedRouteController
};