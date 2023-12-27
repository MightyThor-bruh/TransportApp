import db from '../db/db.connection.js';
import { DB_COLLECTIONS } from '../constants/constants.js';


const showScheduleController = (req, res, next) => {
    const stopName = req.body.bus_stop;
    // const number = req.params.number;
    const scheduleModel = db.getModel(DB_COLLECTIONS.ROUTES);
    scheduleModel.findOne({ stop: stopName}, { schedule: 1, _id: 0 }).then((data) => {
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
    const stopName = req.body.stop;
    const scheduleModel = db.getModel(DB_COLLECTIONS.ROUTES);
    scheduleModel.find({ "schedule.stop": stopName }).then((data) => {
        const schedule = data[0].schedule.filter(item => item.stop === stopName);
        res.render('schedule-weekday', {
            title: 'Расписание маршрута',
            schedule: {
                weekday: schedule.filter(item => item.weekday === 1),
                weekend: schedule.filter(item => item.weekday === 2),
            }
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
    const {number, type} = req.params;
    const {username} = req.user;
    const bookmark = new bookmarkModel({
        user: username,
        route_number: number,
        route_type: type
    });
    console.log(bookmark);
    bookmark.save().then((data) => {
        res.redirect('/bookmarks')
    }).catch((err) => {        
        console.log(err);
        res.status(500).send('Saving bookmark error');
    }).finally(() => {
        console.log(`Bookmark saved!`);
    });
}
const removeBookmarkController = (req, res, next) => {
    const bookmarkModel = db.getModel(DB_COLLECTIONS.BOOKMARKS);
    const {number, type} = req.params;
    const {username} = req.user;

    bookmarkModel.findOneAndDelete({user: username, route_number: number, route_type: type}).then((data) => {
        res.redirect('/bookmarks')
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Delete bookmark error');
    }).finally(() => {
        console.log(`Bookmark deleted!`);
    });

}
const showBookmarkController = (req, res, next) => {
    const user = req.user.username;
    const markModel = db.getModel(DB_COLLECTIONS.BOOKMARKS);
    markModel.find({user: `${user}`}).exec().then((data) => {
        const likedRoutes = data.map(item => ({number: item.route_number, type: item.route_type}));
        res.render('bookmarks', {
            title: 'Мои закладки',
            isUserPage: true,
            route: likedRoutes
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
    removeBookmarkController,
    scheduleController
}