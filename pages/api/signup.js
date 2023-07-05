// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../middleware/dbConnect';
import User from '@/models/user';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email });
        if (user) return res.status(400).json({ error: "User already exists" });
        const { name, email, password } = req.body;
        var token = jwt.sign({ email: email, name: name }, process.env.JWT_SECRET, { expiresIn: '2d' });  // expires in 2 days
        let u = new User({ name, email, password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString() });
        await u.save();
        res.status(200).json({ success: "success", token });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default dbConnect(handler);
