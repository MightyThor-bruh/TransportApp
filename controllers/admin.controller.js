const adminController = (req, res, next) => {
    res.render('index', {
        title: 'Главная',
        isAdminPage: true,
    });
};

const busController = (req, res, next) => {
    res.render('buses', {
        title: 'Управление маршрутами',
        isAdminPage: true,
    });
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