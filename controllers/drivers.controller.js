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

const driversTripsController = (req, res, next) => {
    const user = req.user.username;
    const myTripsModel = db.getModel(DB_COLLECTIONS.TRIPS);
    myTripsModel.find({driver: `${user}`}).exec().then((data) => {
        res.render('trips', {
            title: 'Мои поездки',
            isUserPage: true,
            isDriverPage: true,
            trips: data
        });
        console.log(data);
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error getting trips!');
    }).finally(() => {
        console.log(`Trips List send!`);
    });
}
 


export { driversController, driversPageController, driversTripsController };