// getting-started.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    email: {type: String, required: true},
    orderId: {type: String, required: true},
    paymentInfo: {type: String, default: ''},
    products: [
        {
            productId: {type: String, required: true},
            quantity: {type: Number, default: 1}
        }
    ],
    address: {type: String, required: true},
    amount: {type: Number, required: true},
    status: {type: String, default: 'Initiated', required: true},
    deliveryStatus: {type: String, default: 'unshipped', required: true}
}, {timestamps: true});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
