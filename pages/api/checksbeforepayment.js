// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../middleware/dbConnect';
import Product from '@/models/product';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const cart = (req.body.cart);
        const email = (req.body.email);
        const token = req.headers['auth-token'];
        if (Object.keys(cart).length == 0) {
            return res.status(200).json({ error: 'Please add some products to cart' });
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (data.email != email) {
            return res.status(200).json({ error: 'Please Enter the same email that you have login' });
        }
        let product, sumtotal = 0;
        for (let item in cart) {
            let sum = cart[item].price * cart[item].qty;
            sumtotal += sum;
            product = await Product.findOne({ slug: item });
            if (product.availableQty < cart[item].qty) {
                return res.status(200).json({ error: 'Product out of stock' });
            }
            if (product.price != cart[item].price) {
                return res.status(200).json({ error: 'Some error in price' });
            }
        }
        res.status(200).json({ success: 'success' });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default dbConnect(handler);
