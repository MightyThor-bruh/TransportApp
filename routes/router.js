import { Router } from "express";
import {
    driversController, 
    driversPageController
} from '../controllers/drivers.controller.js';
import {
    transportRouteController, 
    protectedRouteController
} from '../controllers/route.controller.js';
import {
    userSigninController,
    userLoginController,
    loginPageController,
    signinPageController,
    logoutPageController,
    userPageController
} from '../controllers/user.controller.js';
import {
    transportTypeController,
    transportStopsController
} from "../controllers/transport-type.controller.js";
import {scheduleController} from "../controllers/schedule.controller.js";
import {
    adminController,
    busController,
    scheduleSetupController,
    tripController
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
router.get(Routes.transport.type, transportTypeController)
router.get(Routes.schedule.list, scheduleController);
router.get(Routes.schedule.weekend, scheduleController);
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
//-------------------------------DRIVER ROUTES------------------------
router.get(Routes.driver.index, isDriver, driversPageController);
//-------------------------------ADMIN ROUTES------------------------
router.get(Routes.admin.index, isAdmin, adminController);
router.get(Routes.admin.bus, isAdmin, busController);
router.get(Routes.admin.schedule, isAdmin, scheduleSetupController);
router.get(Routes.admin.trip, isAdmin, tripController);

export default router;