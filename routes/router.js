import { Router } from "express";
import {
    driversController, 
    driversPageController
} from '../controllers/drivers.controller.js';
import {
    transportRouteController, 
    protectedRouteController,
} from '../controllers/route.controller.js';
import {
    userSigninController,
    userLoginController,
    loginPageController,
    signinPageController,
    logoutPageController,
    userPageController,
    userRouteController,
    userTypeController,
    userStopsController
} from '../controllers/user.controller.js';
import {
    transportTypeController,
    transportStopsController
} from "../controllers/transport-type.controller.js";
import {showScheduleController, 
    bookmarkController, 
    showBookmarkController,
    removeBookmarkController,
    scheduleController
} from "../controllers/schedule.controller.js";
import {
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
} from "../controllers/admin.controller.js";

import { isAuth, isAdmin, isDriver } from './authMiddleware.js';
import Routes from './routes.js';

const router = Router();

//-------------------------------UNAUTHORIZED USERS' ROUTES------------------------
router.get(Routes.index, (req, res, next) => {
    res.render('index', {
        title: 'Главная',
    });
});
router.get(Routes.driver.list, driversController)
router.get(Routes.transport.routes, transportRouteController)
router.get(Routes.transport.type, transportTypeController);
router.post(Routes.schedule.list, scheduleController);
router.get(Routes.schedule.list, scheduleController);
router.get(Routes.schedule.weekend, showScheduleController);
router.get(Routes.transport.stops, transportStopsController);
//-----------------------------------AUTHORIZATION ROUTES---------------------------
router.get(Routes.user.login, loginPageController);
router.get(Routes.user.signin, signinPageController);
router.get(Routes.user.logout, logoutPageController);
//--------------------------------PROTECTED ROUTE-------------------------
router.get(Routes.transport.protected, protectedRouteController);
//--------------------------------POST ROUTES-------------------------
router.post(Routes.user.login, userLoginController);
router.post(Routes.user.signin, userSigninController);
//-------------------------------USER ROUTES------------------------
router.get(Routes.user.page, isAuth, userPageController);
router.get(Routes.user.routes, isAuth, userRouteController);
router.get(Routes.user.type, isAuth, userTypeController);
router.get(Routes.user.newbookmark, isAuth, bookmarkController);
router.get(Routes.user.removebookmark, isAuth, removeBookmarkController);
router.get(Routes.user.bookmarks, isAuth, showBookmarkController);
router.get(Routes.user.stops, isAuth, userStopsController);
//-------------------------------DRIVER ROUTES------------------------
router.get(Routes.driver.index, isDriver, driversPageController);
//-------------------------------ADMIN ROUTES------------------------
router.get(Routes.admin.index, isAdmin, adminController);
router.get(Routes.admin.bus, isAdmin, showBusController);
router.post(Routes.admin.addroute, isAdmin, busController);
router.post(Routes.admin.addtrip, isAdmin, tripController);
router.get(Routes.admin.trip, isAdmin, showTripController);
router.post(Routes.admin.deleteroute, isAdmin, deleteBusController);
router.post(Routes.admin.updateroute, isAdmin, updateBusController);
router.post(Routes.admin.addschedule, isAdmin, addScheduleController);
router.post(Routes.admin.deletetrip, isAdmin, deleteTripController);
router.post(Routes.admin.updatetrip, isAdmin, updateTripController);

export default router;