import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';

const adminController = (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isAdminPage: true,
    });
};

// const busController = (req, res, next) => {
//     res.render('buses', {
//         title: 'Управление маршрутами',
//         isAdminPage: true,
//     });
// }

const busController = (req, res, next) => {
    const busModel = db.getModel(DB_COLLECTIONS.ROUTES);
    const bus = new busModel(req.body);
    bus.shedule = [req.body.arrival_time, req.body.bus_stop, req.body.day_of_week];
    console.log(bus);
    bus.save().then((data) => {
        res.render('buses', {
            title: 'Управление маршрутами',
            isAdminPage: true,
        });
        console.log(bus);
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Saving route error');
    }).finally(() => {
        console.log(`Route saved!`);
    });
}

const scheduleSetupController = (req, res, next) => {
    res.render('adminschedule', {
        title: 'Управление расписанием',
        isAdminPage: true,
    });
}

const tripController = (req, res, next) => {
    const tripModel = db.getModel(DB_COLLECTIONS.TRIPS);
    const trip = new tripModel(req.body);
    console.log(trip);
    trip.save().then((data) => {
        res.render('admintrip', {
            title: 'Управление поездками',
            isAdminPage: true,
        });
        console.log(trip);
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Saving trip error');
    }).finally(() => {
        console.log(`Trip saved!`);
    });
}

export {
    adminController,
    busController,
    scheduleSetupController,
    tripController
}