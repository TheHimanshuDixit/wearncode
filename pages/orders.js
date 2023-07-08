import React, { useEffect } from 'react'
import Order from '@/models/order';
import mongoose from 'mongoose';

const Orders = ({ order, clearCart }) => {
  const products = order.products;

  useEffect(() => {
    clearCart();
  }, [])

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-28 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">WEARNCODE</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id : {order.orderId}</h1>
            <p className="leading-relaxed">Your order has been successfully placed on {order.createdAt}.</p>
            <p className="leading-relaxed mb-4">Your Payment status is <strong>{order.status}</strong></p>

            <div className="flex border-t border-gray-200 py-2">
              <span className="text-[#007fff] font-bold">Item Description</span>
              <span className="ml-48 text-[#007fff] font-bold">Quantity</span>
              <span className="ml-auto text-[#007fff] font-bold">Item Total</span>
            </div>

            {Object.keys(products).map((item) => {
              return <div key={item} className="flex border-t border-gray-200 py-5">
                <span className="text-gray-500">{products[item].name} ({products[item].size} / {products[item].variant})</span>
                <span className="ml-auto text-gray-900">{products[item].qty}</span>
                <span className="ml-auto text-gray-900">{products[item].price}</span>
              </div>
            }
            )}
            <div>
              <span className="title-font font-medium text-2xl text-gray-900">Subtotal : ₹{order.amount}</span>
              <div className="my-5">
                <button className=" text-white bg-[#007fff] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>
              </div>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="/icon.png" />
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(MONGODB_URI)
  }
  const order = await Order.findById(context.query.id);
  return {
    props: { order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
  }
}


export default Orders




