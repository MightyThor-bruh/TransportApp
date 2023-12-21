import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';

// const driversController = async (req, res, next) => {    
//     const DriversModel = db.getModel(DB_COLLECTIONS.DRIVERS);
//     const db_response = await DriversModel.find({}).exec();
//     if(db_response) {
//         res.send(db_response);
//     } else {       
//         console.log(err);
//         res.status(500).send('Error getting driver'); 
//     }
// }

const driversController = async (req, res, next) => {    
    const DriversModel = db.getModel(DB_COLLECTIONS.USERS);
    const drivers = await DriversModel.find({isDriver: true }).exec();
    // let options = '';
    // drivers.forEach(driver => {
    //     options += `<option value="${driver.username}">${driver.username}</option>`;
    // });
    // document.getElementById('driver').innerHTML = options;
    if(drivers) {
        res.render('index', {
            title: 'Главная',
            isUserPage: true,
            isDriverPage: true,
            driversList: drivers
        });
    } else {       
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