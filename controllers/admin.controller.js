import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';

const adminController = (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isAdminPage: true,
    });
};

const showBusController = (req, res, next) => {
    res.render('buses', {
        title: 'Управление маршрутами',
        isAdminPage: true,
    });
}

const showTripController = (req, res, next) => {
    res.render('admintrip', {
        title: 'Управление поездками',
        isAdminPage: true,
    });
}

const busController = (req, res, next) => {
    const busModel = db.getModel(DB_COLLECTIONS.ROUTES);
    const busDict = {
        number: req.body.number,
        type: req.body.type,
        schedule: [
            {
                time: req.body.time,
                stop: req.body.stop,
                weekday: req.body.weekday
            },
        ]
    }
    const bus = new busModel(busDict);
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

const deleteBusController = (req, res, next) => {
    const number = req.body.number; 
    const type = req.body.type;
    const deleteBusModel = db.getModel(DB_COLLECTIONS.ROUTES);
    deleteBusModel.findOneAndDelete({number, type}).then((data) => {
        if (data) {
            res.render('buses', {
                title: 'Управление маршрутами',
                isAdminPage: true,
            });
            console.log('Route deleted!');
        }
        else {
            res.status(404).send('Маршрут не найден');
        }
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error deleting route');
    }).finally(() => {
        console.log(`Route deleted! (finally block)`);
    });
    
}

const updateBusController = (req, res, next) => {
    const number = req.body.number; 
    const updateData = {
        schedule: [
            {
                arrival_time: req.body.arrival_time,
                bus_stop: req.body.bus_stop,
                day_of_week: req.body.day_of_week
            },
        ]
    }
    const updateBusModel = db.getModel(DB_COLLECTIONS.ROUTES);
    updateBusModel.findOneAndUpdate({number: number}, updateData, { new: true }).then((data) => {
        if (data) {
            res.render('buses', {
                title: 'Управление маршрутами',
                isAdminPage: true,
            });
            console.log('Route updated!');
        }
        else {
            res.status(404).send('Маршрут не найден');
        }
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error updating route');
    }).finally(() => {
        console.log(`Route updated! (finally block)`);
    });
    
}

const addScheduleController = (req, res, next) => {
    const number = req.body.number; 
    const newScheduleItem = {
        arrival_time: req.body.arrival_time,
        bus_stop: req.body.bus_stop,
        day_of_week: req.body.day_of_week
    }
    const addScheduleModel = db.getModel(DB_COLLECTIONS.ROUTES);
    addScheduleModel.findOneAndUpdate({number: number}, { $push: { schedule: newScheduleItem } }, { new: true }).then((data) => {
        if (data) {
            res.render('buses', {
                title: 'Управление маршрутами',
                isAdminPage: true,
            });
            console.log('Schedule added! Route updated!');
        }
        else {
            res.status(404).send('Маршрут не найден');
        }
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error adding schedule');
    }).finally(() => {
        console.log(`Schedule added! Route updated! (finally block)`);
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

const updateTripController = (req, res, next) => {
    const driver = req.body.driver; 
    const updateData = {
        status: req.body.status,
        route: req.body.route
    }
    const updateTripModel = db.getModel(DB_COLLECTIONS.TRIPS);
    updateTripModel.findOneAndUpdate({driver: driver}, updateData, { new: true }).then((data) => {
        if (data) {
            res.render('admintrip', {
                title: 'Управление поездками',
                isAdminPage: true,
            });
            console.log('Trip updated!');
        }
        else {
            res.status(404).send('Поездка не найдена');
        }
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error updating trip');
    }).finally(() => {
        console.log(`Trip updated! (finally block)`);
    });
    
}

const deleteTripController = (req, res, next) => {
    const driver = req.body.driver; 
    const route = req.body.route;
    const deleteTripModel = db.getModel(DB_COLLECTIONS.TRIPS);
    deleteTripModel.findOneAndDelete({driver, route}).then((data) => {
        if (data) {
            res.render('admintrip', {
                title: 'Управление поездками',
                isAdminPage: true,
            });
            console.log('Trip deleted!');
        }
        else {
            res.status(404).send('Поездка не найдена');
        }
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error deleting trip');
    }).finally(() => {
        console.log(`Trip deleted! (finally block)`);
    });
    
}

export {
    adminController,
    busController,
    tripController,
    showBusController,
    showTripController,
    deleteBusController,
    updateBusController,
    addScheduleController,
    updateTripController,
    deleteTripController
}