// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../middleware/dbConnect';
import User from '@/models/user';
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email });
        console.log(user.password);
        const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
        console.log(bytes.toString(CryptoJS.enc.Utf8));
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPass) {
                res.status(200).json({ success: "success", email: user.email, name: user.name });
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
