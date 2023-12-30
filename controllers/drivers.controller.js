import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';


const driversController = async (req, res, next) => {    
    const DriversModel = db.getModel(DB_COLLECTIONS.USERS);
    const drivers = await DriversModel.find({driver: true}).exec();
    if(drivers) {
        res.render('index', {
            title: 'Главная',
            isUserPage: true,
            isDriverPage: true,
            driversList: drivers
        })
        console.log(drivers);
    }
    else {
        console.log(err);  
        res.status(500).send('Error getting driver'); 
    }      
}

const driversPageController = (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isUserPage: true,
        isDriverPage: true,
    });
}

export { driversController, driversPageController };