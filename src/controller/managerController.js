import pool from '../config/connectDB';

let getAllEmployee = async(req, res) => {
    try {
        const [data] = await pool.execute('select * from Employee');
        return res.json({ data })
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }

}
let blockEmployee = async(req, res) => {
    try {
        let idEmployee = req.body.EmpID;
        const [data, fields] = await pool.execute('update Account set Block = 1 where EmpID = ?', [idEmployee]);
        return res.json('block thanh cong');
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }

}
let unblockEmployee = async(req, res) => {
    try {
        let idEmployee = req.body.EmpID;
        const [data, fields] = await pool.execute('update Account set Block = 0 where EmpID = ?', [idEmployee]);
        return res.json('unblock thanh cong');
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }

}
module.exports = {
    getAllEmployee,
    blockEmployee,
    unblockEmployee,
}