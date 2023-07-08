// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../middleware/dbConnect';
import User from '@/models/user';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'PUT') {
        const token = req.headers['auth-token'];
        const data = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ email: data.email });
        if (user) {
            const { name, phone, password, caddress } = req.body;
            const pass = CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString();
            await User.updateOne({ email: data.email }, { name, phone, password: pass, address: caddress });
        }
        res.status(200).json({ success: "success" });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default dbConnect(handler);
