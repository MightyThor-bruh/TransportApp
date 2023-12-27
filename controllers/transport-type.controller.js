import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';

const transportTypeController = async (req, res, next) => {
    const TransportTypeModel = db.getModel(DB_COLLECTIONS.TRANSPORT);
    const db_response = await TransportTypeModel.find({}).exec();
    if(db_response) {
        res.send(db_response);
    } else {       
        console.log(err);
        res.status(500).send('Error getting transport types'); 
    }
}

const transportStopsController = (req, res, next) => {
    const transportNumber = req.params && req.params.number;
    const transportType = req.params && req.params.type;
    const routeStopModel = db.getModel(DB_COLLECTIONS.ROUTES);
    routeStopModel
        .find({number: `${transportNumber}`, type: `${transportType}`})
        .distinct("schedule.stop")
        .then((routeStops) => {
            res.render('route-stops', {
                title: "Остановки на маршруте",
                stops: routeStops,
                type: transportType,
                number: transportNumber
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error getting route stops');
        }).finally(() => {
            console.log(`Route stops List send!`);
        });
}

export {
    transportTypeController,
    transportStopsController
}