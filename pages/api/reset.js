import User from '@/models/user';
import dbConnect from '../../middleware/dbConnect';
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let email = req.body.email;
        let password = req.body.password;
        let user = User.findOne({ email: email });

        if (!user) {
            res.status(400).json({ error: "User does not exist with this email" });
        }
        else {
            const pass = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();
            await User.updateOne({ email: email }, { password: pass });
            res.status(200).json({ success: "Password updated successfully" });
        }
    }
}

export default dbConnect(handler);