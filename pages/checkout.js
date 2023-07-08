import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pincodes from '../pincodes.json'

const Checkout = ({ cart, addToCart, removeFromCart, subtotal }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Router.push('/login')
    }
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleChange = async (e) => {

    const { name, value } = e.target
    if (name == 'name') {
      setName(value)
    } else if (name == 'email') {
      setEmail(value)
    } else if (name == 'address') {
      setAddress(value)
    } else if (name == 'phone') {
      setPhone(value)
    } else if (name == 'pincode') {
      setPincode(value)
      if (value.length == 6) {
        const res = await fetch('/api/pincode')
        const data = await res.json()
        if (Object.keys(data).includes(value)) {
          setCity(data[value][0])
          setState(data[value][1])
        }
        else {
          setCity('')
          setState('')
        }
      }
      else {
        setCity('')
        setState('')
      }
    }

    if (name.length > 1 && email.length > 1 && address.length > 1 && phone.length > 1 && pincode.length > 1) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const handleClick = async () => {
    if (Object.keys(pincodes).includes(pincode)) {
      fetch('/api/checksbeforepayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ cart, email }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == 'success') {
            const add = address + ',' + city + ',' + state + ',' + pincode;
            setAddress(add)
            const d = { email, add }
            localStorage.setItem('order', JSON.stringify(d));
            setName('')
            setEmail('')
            setAddress('')
            setPhone('')
            setCity('')
            setState('')
            setPincode('')
            setDisabled(true)
            Router.push('/payment')
          } else {
            toast.error(data.error, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      toast.error('We are not delivering to this pincode', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  return (
    <div className='container m-auto px-10'>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className='font-bold text-4xl my-8 text-center'>Checkout</h1>
      <h2 className='font-bold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-[#007fff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-[#007fff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea onChange={handleChange} value={address} name="address" id="address" cols="30" rows="5" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-[#007fff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} value={phone} type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-[#007fff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} value={pincode} type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-[#007fff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input value={state} onChange={handleChange} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-[#007fff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input value={city} onChange={handleChange} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 
            focus:border-indigo-500 focus:ring-2 focus:ring-[#007fff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <h2 className='font-bold text-xl mb-1'>2. Review Cart Items & Pay</h2>
      <div className="sideCart px-8 pt-2 pb-5 bg-blue-300 rounded-md">
        <ol className='list-decimal font-semibold text-sm md:text-xl'>
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Cart is empty !!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='font-semibold w-2/3 md:w-1/3'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                <div className='flex items-center justify-center font-semibold'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-[#007fff]' /><span className=' mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-[#007fff]' /></div>
              </div>
            </li>
          })}
        </ol>
        <span className="total font-bold">Subtotal : {subtotal}</span>
      </div>
      <button disabled={disabled} onClick={handleClick} className=" disabled:bg-blue-300 flex m-2 text-white bg-[#007fff] border-0 py-2 px-4 focus:outline-none hover:bg-[#009fff] text-md md:text-lg rounded-lg">Pay ₹ {subtotal}</button>
    </div>
  )
}

export default Checkout