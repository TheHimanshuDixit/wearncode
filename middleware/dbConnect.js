import mongoose from "mongoose";
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define Mongo DB URI'
    )
}

const dbConnect = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res)
    }
    // Use new db connection
    await mongoose.connect(MONGODB_URI)
    return handler(req, res)
}

export default dbConnect