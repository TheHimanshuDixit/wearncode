import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from '@/models/product';


const Stickers = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(products).length === 0 && <p>Sorry, all the Stickers are currently out of stock. Now stock coming soon. Stay Tuned!</p>}
          {Object.keys(products).map((item) => {
            return <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-6">
              <Link href={`/products/${products[item].slug}`} className="block relativerounded overflow-hidden">
                <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src={products[item].image} />
              </Link>
              <div className="mt-4 text-center md:text-left ">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">₹{products[item].price}</p>
                <div className="mt-1">
                  {products[item].size.includes('S') && <span className='border border-gray-500 px-1 mx-1'>S</span>}
                  {products[item].size.includes('M') && <span className='border border-gray-500 px-1 mx-1'>M</span>}
                  {products[item].size.includes('L') && <span className='border border-gray-500 px-1 mx-1'>L</span>}
                  {products[item].size.includes('XL') && <span className='border border-gray-500 px-1 mx-1'>XL</span>}
                  {products[item].size.includes('XXL') && <span className='border border-gray-500 px-1 mx-1'>XXL</span>}
                </div>
                <div className="mt-1">
                  {products[item].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                </div>
              </div>
            </div>
          })
          }

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
  const products = await Product.find({ category: 'Sticker' });
  let stickers = {}
  for (let item of products) {
    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
        stickers[item.title].color.push(item.color)
      }
      if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        stickers[item.title].size.push(item.size)
      }

    }
    else {
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color];
        stickers[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(stickers)) }, // will be passed to the page component as props
  }
}

export default Stickers