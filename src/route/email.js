import express from "express"
import emailControll from "../controller/emailControll"

let router = express.Router();

const initEmailRoute = (app) => {
    router.post('/', emailControll.sendGmail);
    return app.use('/email', router);
}

export default initEmailRoute;