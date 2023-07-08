// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../middleware/dbConnect';
import User from '@/models/user';
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'GET') {
        const token = req.headers['auth-token'];
        const data = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ email: data.email });
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        res.status(200).json({
            user: user, password: decryptedPass
        });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default dbConnect(handler);
