import express from "express";
import employeerController from '../controller/employeeController';
import checkLogin from '../middle/checkLogin';


let router = express.Router();

const initEmployeeRoute = (app) => {
    //get detail by id
    router.get('/', employeerController.getDetail);
    // chang password 
    router.post('/pass', employeerController.changePassword);

    return app.use('/employee', checkLogin.checkEmployee, router);
}

export default initEmployeeRoute;