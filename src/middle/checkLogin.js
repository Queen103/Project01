import pool from '../config/connectDB';
import jwt from 'jsonwebtoken'

let checkEmployee = async(req, res, next) => {
    const EmpID = req.cookies.EmpID;
    const ID = jwt.verify(EmpID, process.env.SECRET);
    if (!ID) {
        return res.json('ban chua dang nhap');
    }
    const data = await pool.execute('select * from account where EmpID = ? and Role = 0', [req.cookies.EmpID]);
    if (!data) {
        return res.json('ko ton tai');
    }
    if (data.Block == 1) {
        return res.json('Blocked');
    }
    next();
};


let checkManager = async(req, res, next) => {
    const EmpID = req.cookies.EmpID;
    const ID = jwt.verify(EmpID, process.env.SECRET);
    if (!ID) {
        return res.json('ban chua dang nhap');
    }
    const [data] = await pool.execute('select * from account where EmpID = ? ', [ID]);
    console.log(data);
    if (!data) {
        if (data[0].Role == 0) {
            return res.json('khong co quyen');
        }
        return res.json('ko ton tai');
    }
    console.log('---check log----');
    next();
};

module.exports = {
    checkEmployee,
    checkManager
}