import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';

const defaultPageController = (req, res, next) => {
    const allTransportRoutes = db.getModel(DB_COLLECTIONS.ROUTES);
    const currentDate = new Date();
    const closingDate = new Date(currentDate.getTime() + 1180000);
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const closingTime = `${closingDate.getHours()}:${closingDate.getMinutes()}`;
    allTransportRoutes.find({"schedule.time": { $gte: currentTime, $lte: closingTime }}).exec().then((data) => {
        const dataToSend = data.reduce((newArr, current) => {
            const { schedule, number, type } = current;
            const newSchedule = schedule.filter(item => item.time > currentTime && item.time < closingTime);
            return [
                ...newArr,
                ...newSchedule.map(scheduleItem => ({
                    time: scheduleItem.time,
                    stop: scheduleItem.stop,
                    weekday: scheduleItem.weekday,
                    number,
                    type
                }))
            ].sort((a,b) => a.time > b.time ? 1 : (a.time < b.time ? -1 : 0))
        }, [])
        res.render('index', {
            title: 'Главная',
            routes: dataToSend
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Error getting routes');
    }).finally(() => {
        console.log(`Routes List send!`);
    });
}


export {
    defaultPageController
};