// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../middleware/dbConnect';
import Order from '@/models/order';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    const token = req.body.token;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    let orders = await Order.find({ email: data.email })
    res.status(200).json({ orders });
}

export default dbConnect(handler);
