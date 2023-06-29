import express from "express";
import loginController from '../controller/loginController';


let router = express.Router();

const initLoginRoute = (app) => {
    router.get('/', (req, res) => {
        res.render('loginEmployee');
    });
    router.get('/logout', loginController.logout);
    router.post('/login', loginController.login);
    router.post('/create', loginController.createAccount);
    //cop mỗi dòng này thôi 
    router.post('/update', loginController.update);
    // hết 
    router.get('/createAccount', (req, res) => {
        res.render('createE');
    });
    return app.use('/', router);
}

export default initLoginRoute;