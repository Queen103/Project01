import express from "express"
import emailControll from "../controller/emailControll"

let router = express.Router();

const initEmailRoute = (app) => {
    router.post('/', emailControll.sendGmail);
    router.get('/resetpass/:EmpID', emailControll.urlToReset);
    router.post('/resetWithMail', emailControll.resetPass)
    return app.use('/email', router);
}

export default initEmailRoute;