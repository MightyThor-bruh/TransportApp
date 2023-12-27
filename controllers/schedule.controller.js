import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';


const showScheduleController = (req, res, next) => {
    const stopName = req.body.bus_stop;
    // const number = req.params.number;
    const scheduleModel = db.getModel(DB_COLLECTIONS.ROUTES);
    scheduleModel.findOne({ bus_stop: stopName}, { schedule: 1, _id: 0 }).then((data) => {
        console.log(data);
        res.render('schedule-weekend', {
            title: 'Расписание маршрута',
            schedule: data
        });
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error getting schedule');
    }).finally(() => {
        console.log(`Schedule sent!`);
    });
    // const stopNum = req.params && req.params.number;
    // const scheduleModel = db.getModel(DB_COLLECTIONS.ROUTES);
    // scheduleModel.find({number: `${stopNum}`}).exec().then((data) => {
    //     console.log(data);
    //     res.render('schedule-weekday', {
    //         title: 'Расписание маршрута',
    //         stops: data
    //     });
    // }).catch((err) => {        
    //     console.log(err);
    //     res.status(500).send('Error getting schedule');
    // }).finally(() => {
    //     console.log(`Schedule sent!`);
    // });

}

const scheduleController = (req, res, next) => {
    const stopName = req.body.bus_stop;
    // const number = req.params.number;
    const scheduleModel = db.getModel(DB_COLLECTIONS.ROUTES);
    scheduleModel.findOne({ bus_stop: stopName}, { schedule: 1, _id: 0 }).then((data) => {
        console.log(data);
        res.render('schedule-weekday', {
            title: 'Расписание маршрута',
            schedule: data
        });
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error getting schedule');
    }).finally(() => {
        console.log(`Schedule sent!`);
    });

}

const bookmarkController = (req, res, next) => {
    const bookmarkModel = db.getModel(DB_COLLECTIONS.BOOKMARKS);
    const bookmark = new bookmarkModel({
        user: req.user.username,
        route: req.params.number,
    });
    console.log(bookmark);
    bookmark.save().then((data) => {
        res.render('bookmarks', {
            title: 'Избранные маршруты',
            isUserPage: true
        });
        console.log(bookmark);
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Saving bookmark error');
    }).finally(() => {
        console.log(`Bookmark saved!`);
    });
}

const showBookmarkController = (req, res, next) => {
    const user = req.user.username;
    const markModel = db.getModel(DB_COLLECTIONS.BOOKMARKS);
    markModel.find({user: `${user}`}).exec().then((data) => {
        res.render('bookmarks', {
            title: 'Мои закладки',
            isUserPage: true,
            marks: data
        });
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Error getting bookmarks!');
    }).finally(() => {
        console.log(`Bookmarks List send!`);
    });
}

export {
    showScheduleController,
    bookmarkController,
    showBookmarkController,
    scheduleController
}