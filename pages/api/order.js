// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../middleware/dbConnect';
import Order from '@/models/order';
import Product from '@/models/product';

const handler = async (req, res) => {
  if (req.method == 'POST') {
    let { email, orderId, paymentInfo, products, address, amount } = await req.body;
    for (let slug in products) {
      await Product.findOneAndUpdate({ slug }, { $inc: { availableQty: -products[slug].qty } });
    }
    const u = await new Order({ email, orderId, paymentInfo, products, address, amount, status: "Paid" });
    await u.save();
    res.status(200).json({ success: "success", u });
  }
  else {
    res.status(400).json({ error: "Order not placed" });
  }
}

export default dbConnect(handler);
