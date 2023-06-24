// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../middleware/dbConnect';
import User from '@/models/user';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email });
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPass) {
                var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2d' });  // expires in 2 days
                res.status(200).json({ success: "success", token });
            }
            else {
                res.status(400).json({ success: "success", error: "Invalid Credentials" });
            }
        }
        else {
            res.status(400).json({ success: "success", error: "No user forund" });
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default dbConnect(handler);
