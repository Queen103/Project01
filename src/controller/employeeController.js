import pool from '../config/connectDB';
import jwt from 'jsonwebtoken'

let getDetail = async(req, res) => {
    try {
        const EmpID = req.cookies.EmpID;
        const idEmployee = jwt.verify(EmpID, process.env.SECRET);
        //console.log(jwt.verify(EmpID, process.env.SECRET));
        const [data, fields] = await pool.execute('select E.Fullname,E.Birthday,E.Gender,E.Email,E.Phone,E.Address,E.EmpID,A.Block from Employee E left join Account A on E.EmpID = A.EmpID where E.EmpID = ?', [idEmployee]);
        console.log(data[0]);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }

}
let changePassword = async(req, res) => {
    try {
        const EmpID = req.cookies.EmpID;
        const idEmployee = jwt.verify(EmpID, process.env.SECRET);
        let newpass = req.body.pass;
        console.log(req.body.pass);
        const [data] = await pool.execute('select * from account where Password = ? and EmpID = ?', [newpass, idEmployee]);
        console.log(data[0]);
        if (data[0]) {
            return res.json('exit');
        }
        const [data1] = await pool.execute('update account set Password = ? where EmpID = ? ', [newpass, idEmployee]);
        return res.json('success');
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }


}

module.exports = {
    getDetail,
    changePassword
}