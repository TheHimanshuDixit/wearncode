import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/Ai';

const Navbar = () => {
  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-start justify-center items-center p-2 shadow-xl'>
        <div className="logo mx-10">
          <Link href={"/"}><Image src="/logo.png" alt="logo" width={150} height={20} /></Link>
        </div>
        <div className="nav pt-2 md:pt-0">
          <ul className="flex items-center space-x-6 font-bold">
            <Link href={"/tshirts"}><li>Tshirts</li></Link>
            <Link href={"/hoodies"}><li>Hoodies</li></Link>
            <Link href={"/stickers"}><li>Stickers</li></Link>
            <Link href={"/mugs"}><li>Mugs</li></Link>
          </ul>
        </div>
        <div className="cart absolute right-0 mx-5  text-xl md:text-2xl "><AiOutlineShoppingCart /></div>
      </div >
    </>
  )
}

export default Navbar