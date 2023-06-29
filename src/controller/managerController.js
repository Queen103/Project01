import pool from '../config/connectDB';

let getAllEmployee = async(req, res) => {
    const [data] = await pool.execute('select * from Employee');
    //console.log(data);
    // return res.render('listEmployee.ejs', { dataE: data });
    return res.json({ data })
}
let blockEmployee = async(req, res) => {
    let idEmployee = req.body.EmpID;
    const [data, fields] = await pool.execute('update Account set Block = 1 where EmpID = ?', [idEmployee]);
    return res.json('block thanh cong');
}
let unblockEmployee = async(req, res) => {
    let idEmployee = req.body.EmpID;
    const [data, fields] = await pool.execute('update Account set Block = 0 where EmpID = ?', [idEmployee]);
    return res.json('unblock thanh cong');
}
module.exports = {
    getAllEmployee,
    blockEmployee,
    unblockEmployee,
}