import express from 'express';
import configViewEngine from './config/viewEngine'
import initManagerRoute from './route/manager';
import initEmployeeRoute from './route/employee';
import initLoginRoute from './route/login';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// import cors from 'cors';


require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true }, { credentials: true }));

// setup view engine

//intit login route
initLoginRoute(app);
console.log('.....check');

//init web route
initManagerRoute(app);
initEmployeeRoute(app);
configViewEngine(app);

// app.use(cors);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})