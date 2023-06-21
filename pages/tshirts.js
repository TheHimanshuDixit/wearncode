import React from 'react'
import Link from 'next/link'
import mongoose from "mongoose";
import Product from '@/models/product';


const Tshirts = ({ products }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {products.map((item) => {
            return <div key={item._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-6">
              <Link href={`/products/${item.slug}`} className="block relativerounded overflow-hidden">
                <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src={item.image} />
              </Link>
              <div className="mt-4 text-center md:text-left ">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                <p className="mt-1">{item.price}</p>
                <p className="mt-1">S, M, L, XL, XXL</p>
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
  let products = await Product.find({ category: 'T-shirt' });
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  }
}

export default Tshirts