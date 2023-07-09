import User from '@/models/user';
import dbConnect from '../../middleware/dbConnect';
require('dotenv').config();
let nodemailer = require('nodemailer');

const handler = async (req, res) => {

    // check if the user exists in the database
    if (req.method == 'POST') {
        let email = req.body.email;
        let user = await User.findOne({ email: email });
        if (!user) {
            res.status(400).json({ error: "User does not exist with this email" });
        }
        else {
            // send email to the user with a link to reset the password
            let random = Math.floor((Math.random() * 1000000) + 1);
            let emailtemplate = `<!doctype html>
            <html lang="en-US">

            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <title>Reset Password Email Template</title>
                <meta name="description" content="Reset Password Email Template.">
                <style type="text/css">
                    a:hover {
                        text-decoration: underline !important;
                    }
                </style>
            </head>
            
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                    <tr>
                        <td>
                            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;">
                                        <a href="http://localhost:3000/" title="logo" target="_blank">
                                            <img width="200"
                                                src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg?size=626&ext=jpg&ga=GA1.2.903730306.1655306128&semt=sph"
                                                title="logo" alt="logo">
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 35px;">
                                                    <h1
                                                        style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                        You have
                                                        requested to reset your password</h1>
                                                    <span
                                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                        We cannot simply send you your old password. A unique code is given to reset
                                                        your
                                                        password. To reset your password, to reset your password enter this code in
                                                        required field.
                                                    </p>
                                                    <a href="javascript:void(0);"
                                                        style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">${random}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;">
                                        <p
                                            style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                                            &copy; <strong>www.wearncode.com</strong></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            
            </html>`
            try {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    service: 'gmail',
                    auth: {
                        user: process.env.USER,
                        pass: process.env.PASS,
                    }
                });
                const mailOption = {
                    from: process.env.USER,                                     //Sender mail
                    to: email,					                                // Recever mail
                    subject: 'Password change request',                         // Subject of mail
                    html: emailtemplate                                         // Html template
                }
                transporter.sendMail(mailOption, function (error, info) {
                    if (error) {
                        res.status(400).json({ error: "Not send !! please do again" });
                    }
                    else {
                        res.status(200).json({ success: "Email sent successfully", random: random })
                    }
                })
            }
            catch (error) {
                res.status(500).send("Internal Server Error");
            }
        }
    }
}


export default dbConnect(handler);