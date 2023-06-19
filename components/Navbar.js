import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/Ai';

const Navbar = () => {
  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-start justify-center items-center p-2'>
        <div className="logo mx-5">
          <Image src="/logo.png" alt="logo" width={150} height={20} />
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-2 font-bold">
            <Link href={"/"}><li>Tshirts</li></Link>
            <Link href={"/"}><li>Hoodies</li></Link>
            <Link href={"/"}><li>Stickers</li></Link>
            <Link href={"/"}><li>Mugs</li></Link>
          </ul>
        </div>
        <div className="cart absolute right-0 mx-5  text-xl md:text-2xl "><AiOutlineShoppingCart /></div>
      </div >
    </>
  )
}

export default Navbar