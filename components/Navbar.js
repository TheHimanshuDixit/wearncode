import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useRouter } from 'next/router';


const Navbar = ({ user, cart, cartQty, logout, addToCart, removeFromCart, clearCart, subtotal }) => {

  const [dropdown, setDropdown] = useState(false)

  const Router = useRouter()

  // useEffect(() => {
  //     ref.current.classList.remove('translate-x-0')
  //     ref.current.classList.add('translate-x-full')
  // }, [])

  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }

  const ref = useRef()
  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-start justify-center items-center p-2 shadow-xl sticky top-0 z-10 bg-white'>
        <div className="logo mr-auto ml-14 md:mx-10">
          <Link href={"/"}><Image src="/logo.png" alt="logo" width={150} height={20} priority={true} /></Link>
        </div>
        <div className="nav pt-2 md:pt-0">
          <ul className="flex items-center space-x-6 font-bold">
            <Link href={"/tshirts"}><li className='hover:text-[#007fff] hover:underline'>Tshirts</li></Link>
            <Link href={"/hoodies"}><li className='hover:text-[#007fff] hover:underline'>Hoodies</li></Link>
            <Link href={"/stickers"}><li className='hover:text-[#007fff] hover:underline'>Stickers</li></Link>
            <Link href={"/mugs"}><li className='hover:text-[#007fff] hover:underline'>Mugs</li></Link>
          </ul>
        </div>
        <div className="cart flex items-center absolute right-0 top-4 md:top-auto mx-5 text-xl md:text-2xl cursor-pointer">
          {user.value && <MdAccountCircle onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='mx-2' />}
          {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className='absolute w-20 md:w-24 text-center top-5 md:top-6 right-8 md:right-9 bg-blue-400 shadow-xl rounded-md p-2 text-sm md:text-lg text-white'>
            <Link href={"/profile"}><div className='hover:text-[#007fff] hover:underline font-semibold'>Profile</div></Link>
            <Link href={"/myorders"}><div className='hover:text-[#007fff] hover:underline font-semibold'>Orders</div></Link>
            <div onClick={logout} className='hover:text-[#007fff] hover:underline font-semibold'>Logout</div>
          </div>}
          {!user.value && <Link href={"/login"} className='flex'>
            <button className='bg-[#007fff] rounded-md text-white mx-2 py-1 px-2 text-sm md:text-md'>Login</button>
          </Link>}
          <AiOutlineShoppingCart onClick={toggleCart} />
          {cartQty > 0 && <div className='absolute -right-1 -top-2 text-xs bg-[#007fff] text-white px-1 rounded-full'>{cartQty}</div>}
        </div>

        <div ref={ref} className={`w-64 h-[100vh] overflow-y-scroll sideCart absolute top-0 right-0 bg-blue-300 px-8 py-10 transform transition-transform translate-x-full ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
          <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
          <AiFillCloseCircle onClick={toggleCart} className='absolute top-4 right-4 cursor-pointer text-xl text-[#007fff]' />
          <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length == 0 && <div className='text-center my-4 font-semibold'>Cart is empty !!</div>}
            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-6">
                  <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className='flex items-center justify-center font-semibold w-1/3 text-sm'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-[#007fff]' /><span className=' mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-[#007fff]' /></div>
                </div>
              </li>
            })}
          </ol>
          <div className="total font-bold my-2">Subtotal : {subtotal}</div>
          <div className="flex">
            <Link href={'/checkout'}><button disabled={Object.keys(cart) == 0 ? true : false} className="disabled:bg-blue-400 flex mx-2 text-white bg-[#007fff] border-0 py-2 px-2 focus:outline-none hover:bg-[#009fff] text-xs rounded-lg"><BsFillBagCheckFill className='mx-1' />Checkout</button></Link>
            <button disabled={Object.keys(cart) == 0 ? true : false} onClick={clearCart} className="disabled:bg-blue-400 flex mx-2 text-white bg-[#007fff] border-0 py-2 px-2 focus:outline-none hover:bg-[#009fff] text-xs rounded-lg">ClearCart</button>
          </div>
        </div>

      </div >
    </>
  )
}

export default Navbar