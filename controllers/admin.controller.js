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
    
    // const Schedule = db.getModel(DB_COLLECTIONS.SCHEDULE);
    // const Schedule = connection.model('Schedule', ScheduleSchema);
    // const Stages = connection.model('RouteStages', RouteStagesSchema);
}

const scheduleSetupController = (req, res, next) => {
    res.render('adminschedule', {
        title: 'Управление расписанием',
        isAdminPage: true,
    });
}

const tripController = (req, res, next) => {
    res.render('admintrip', {
        title: 'Управление поездками',
        isAdminPage: true,
    });
}

export {
    adminController,
    busController,
    scheduleSetupController,
    tripController
}