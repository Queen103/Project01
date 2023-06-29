import express from "express";
import managerController from '../controller/managerController';
import checkLogin from '../middle/checkLogin';


let router = express.Router();

const initManagerRoute = (app) => {
    //get list 
    router.get('/list', managerController.getAllEmployee);
    //-----------------------
    router.post('/block', managerController.blockEmployee);
    router.post('/unblock', managerController.unblockEmployee);

    return app.use('/manager', checkLogin.checkManager, router);
}

export default initManagerRoute;