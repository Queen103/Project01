require('dotenv').config
import nodemailer from "nodemailer"
import pool from '../config/connectDB';
import jwt from 'jsonwebtoken'


let sendGmail = async(req, res) => {
    try {
        let email = req.body.email;
        const [data, fields] = await pool.execute("select EmpID from employee where Email = ? ", [email]);
        if (!data[0]) {
            return res.json("Not exit email");
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.ACCOUNT_GMAIL,
                pass: process.env.PASS_GMAIL
            }
        });
        //set cookie
        const EmpID = jwt.sign(data[0].EmpID, process.env.SECRET);

        const info = await transporter.sendMail({
            from: '"QUANH NÈ " <quanhne103@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Reset password", // Subject line
            text: "", // plain text body
            html: `<b>Click here to reset</b>
                <a href="http://localhost:8080/email/resetpass/${EmpID}">Click Here</a>`,
        });

        console.log("Message sent: %s", info.messageId);
        return res.json("success");
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }

}

let urlToReset = async(req, res) => {
    try {
        let EmpID = req.params['EmpID'];
        let ID = jwt.verify(EmpID, process.env.SECRET);
        const [data] = await pool.execute("select * from account where EmpID = ?", [ID]);
        if (data[0]) {
            return res.render("../view/changpass.ejs", { EmpID: ID });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }
}

let resetPass = async(req, res) => {
    try {
        let { EmpID, password } = req.body;
        const [data] = await pool.execute("update account set Password = ? where EmpID = ?", [password, EmpID]);
        return res.json("success");
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server error');
    }
}

module.exports = {
    sendGmail,
    urlToReset,
    resetPass
}