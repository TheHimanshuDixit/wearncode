import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai';
import { BsFillBagCheckFill } from 'react-icons/Bs';


const Navbar = () => {
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
    }
    else {
      ref.current.classList.add('translate-x-full')
    }
  }
  const ref = useRef()
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
        <div onClick={toggleCart} className="cart absolute right-0 mx-5  text-xl md:text-2xl  cursor-pointer"><AiOutlineShoppingCart /></div>

        <div ref={ref} className="w-64 h-full sideCart absolute top-0 right-0 bg-blue-300 px-8 py-10 transform transition-transform translate-x-full">
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <span onClick={toggleCart} className='absolute top-4 right-4 cursor-pointer text-xl text-[#007fff]'><AiFillCloseCircle /></span>
          <ol className='list-decimal font-semibold'>
            <li>
              <div className="item flex my-6">
                <div className='w-2/3 font-semibold'>Tshirt - wear the code</div>
                <div className='flex items-center justify-center font-semibold w-1/3 text-sm'><AiFillMinusCircle className='cursor-pointer text-[#007fff]' /><span className=' mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-[#007fff]' /></div>
              </div>
            </li>
            <li>
              <div className="item flex my-6">
                <div className='w-2/3 font-semibold'>Tshirt - wear the code</div>
                <div className='flex items-center justify-center font-semibold w-1/3 text-sm'><AiFillMinusCircle className='cursor-pointer text-[#007fff]' /><span className=' mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-[#007fff]' /></div>
              </div>
            </li>
            <li>
              <div className="item flex my-6">
                <div className='w-2/3 font-semibold'>Tshirt - wear the code</div>
                <div className='flex items-center justify-center font-semibold w-1/3 text-sm'><AiFillMinusCircle className='cursor-pointer text-[#007fff]' /><span className=' mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-[#007fff]' /></div>
              </div>
            </li>
            <li>
              <div className="item flex my-6">
                <div className='w-2/3 font-semibold'>Tshirt - wear the code</div>
                <div className='flex items-center justify-center font-semibold w-1/3 text-sm'><AiFillMinusCircle className='cursor-pointer text-[#007fff]' /><span className=' mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-[#007fff]' /></div>
              </div>
            </li>
            <li>
              <div className="item flex my-6">
                <div className='w-2/3 font-semibold'>Tshirt - wear the code</div>
                <div className='flex items-center justify-center font-semibold w-1/3 text-sm'><AiFillMinusCircle className='cursor-pointer text-[#007fff]' /><span className=' mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-[#007fff]' /></div>
              </div>
            </li>
            <li>
              <div className="item flex my-6">
                <div className='w-2/3 font-semibold'>Tshirt - wear the code</div>
                <div className='flex items-center justify-center font-semibold w-1/3 text-sm'><AiFillMinusCircle className='cursor-pointer text-[#007fff]' /><span className=' mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-[#007fff]' /></div>
              </div>
            </li>
          </ol>
          <div className="flex">
            <button className="flex mx-2 text-white bg-[#007fff] border-0 py-2 px-2 focus:outline-none hover:bg-[#009fff] text-xs rounded-lg"><BsFillBagCheckFill className='m-1' />Checkout</button>
            <button className="flex mx-2 text-white bg-[#007fff] border-0 py-2 px-2 focus:outline-none hover:bg-[#009fff] text-xs rounded-lg">Clear Cart</button>
          </div>

        </div>
      </div >
    </>
  )
}

export default Navbar