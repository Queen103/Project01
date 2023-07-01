import pool from '../config/connectDB';
import jwt from 'jsonwebtoken'

let login = async(req, res) => {
    try {
        let { username, password } = req.body;
        //console.log(username);
        const [data] = await pool.execute('select * from `account` where Account =? and Password =?', [username, password]);
        // console.log(data[0].EmpID);
        const EmpID = jwt.sign(data[0].EmpID, process.env.SECRET);
        console.log(EmpID);
        //console.log(req.body.username);
        if (data[0]) {
            res.cookie('EmpID', EmpID);
            console.log(req.cookies);
            return res.json('dang nhap thanh cong');
        }
        return res.json('sai mk va tk ');
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }
    //console.log(req.body);

}

let logout = async(res, req) => {
    try {
        console.log('check logout', res.cookies);
        res.clearCookie('EmpID');
        return res.json('logout thanh cong');
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }

}

let createAccount = async(req, res) => {
        try {
            console.log(req.body);
            let { account, password, name, birth, gender, mail, phone, address } = req.body;
            console.log(account);
            const [data1] = await pool.execute('select * from `account` where Account = ?', [account]);
            console.log(data1);
            if (data1[0]) {
                return res.json('Account exit');
            }
            const data = await pool.execute('insert into Account(Account,Password,Block,Role) values (?,?,0,0)', [account, password]);
            const [data2] = await pool.execute('select max(EmpID) as maxE from Account');
            const [data3] = await pool.execute('insert into Employee(Fullname,Birthday,Gender,Email,Phone,Address,EmpID) values (?,?,?,?,?,?,?)', [name, birth, gender, mail, phone, address, data2[0].maxE]);
            return res.json('taoj thanh cong');
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send('Server error');
        }

    }
    // cop hết chỗ này vào
let update = async(req, res) => {
        try {
            console.log(req.body);
            let { name, birth, gender, mail, phone, address, EmpID } = req.body;
            console.log(name);
            const [data3] = await pool.execute('update Employee set Fullname = ? , Birthday = ?, Gender = ?,Email = ?, Phone = ?, Address = ? where EmpID = ?', [name, birth, gender, mail, phone, address, EmpID]);
            return res.json('sua thanh cong');
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send('Server error');
        }

    }
    //đó
module.exports = {
    login,
    logout,
    createAccount,
    //cả đây nữa
    update
    // đến đây 
}