const scheduleController = (req, res, next) => {
    res.render('schedule-weekday', {
        title: 'Расписание маршрута',
    });
}


export {
    scheduleController
}