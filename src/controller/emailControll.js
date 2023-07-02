require('dotenv').config
import nodemailer from "nodemailer"

let sendGmail = async(req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.ACCOUNT_GMAIL,
                pass: process.env.PASS_GMAIL
            }
        });
        const info = await transporter.sendMail({
            from: '"QUANH NÈ " <quanhne103@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        return res.json("success");
    } catch (error) {
        console.error('Error:', error);
        // return res.status(500).send('Server error');
    }

}

module.exports = {
    sendGmail
}