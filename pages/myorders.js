import React, { useEffect, useState } from 'react'
import router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
// import mongoose from "mongoose";
// import Order from '@/models/order';

const Myorders = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
    fetch('/api/myorders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setOrders(data.orders)
      })
  }, [])

  return (
    <>
      <Head>
        <title>WearnCode</title>
      </Head>
      <div className='container mx-auto min-h-screen'>
        <h1 className='font-semibold text-2xl text-center pt-10 pb-5'>My Orders</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">Order Id</th>
                      <th scope="col" className="px-6 py-4">Email</th>
                      <th scope="col" className="px-6 py-4">Amount</th>
                      <th scope="col" className="px-6 py-4">Details</th>
                      <th scope="col" className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>

                    {orders.length > 0 && orders.map((index) => {
                      return <tr key={index._id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index.orderId}</td>
                        <td className="whitespace-nowrap px-6 py-4">{index.email}</td>
                        <td className="whitespace-nowrap px-6 py-4">{index.amount}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <Link href={'/orders?id=' + index._id} className='text-blue-500 underline'>Click</Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{index.status}</td>
                      </tr>
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const MONGODB_URI = process.env.MONGODB_URI;
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(MONGODB_URI)
//   }
//   const orders = await Order.find({});

//   return {
//     props: { order: orders },
//   }
// }

export default Myorders