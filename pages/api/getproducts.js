// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from '../../models/product';
import dbConnect from '../../middleware/dbConnect';

const handler = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
}

export default dbConnect(handler);
