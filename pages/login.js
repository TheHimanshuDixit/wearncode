import Link from 'next/link'
import Script from 'next/script'
import React, { useEffect, useRef, useState } from 'react'
import router from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/Ai'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [display1, setDisplay1] = useState('hidden')
  const [display2, setDisplay2] = useState('')

  let ref = useRef()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/')
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    let result = await res.json()
    setEmail('');
    setPassword('');
    if (result.success == 'success') {
      localStorage.setItem('token', result.token)
      toast.success('You are successfully logged in', {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push('/')
      }, 1000);
    }
    else {
      toast.error(result.error, {
        position: "bottom-left",
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

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const ptype1 = () => {
    ref.current.type = 'password'
    setDisplay1('hidden')
    setDisplay2('')
  }
  const ptype2 = () => {
    ref.current.type = 'current-password'
    setDisplay2('hidden')
    setDisplay1('')
  }
  return (
    <div className='mt-5 md:mb-24 md:mt-28'>
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
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center md:flex-row shadow rounded-xl max-w-7xl w-[90%]  m-2">
          <div className=" w-full md:w-3/4 shadow-2xl shadow-black py-10">
            <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
              <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-2">Login to your account</h1>
              <h1 className="text-sm font-medium text-gray-600 m-2">Login using Social accounts</h1>
              <div className="text-lg lg:text-xl text-center space-x-5 m-2">
                <a href="#">
                  <i className="fa-brands fa-facebook-f text-white  bg-blue-500 rounded-full px-[14px] py-[10px] "></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-twitter text-white bg-cyan-400  rounded-full px-[10px] py-[10px] "></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-google-plus-g text-white bg-red-500 rounded-full px-[10px] py-[10px] "></i>
                </a>
              </div>
              <h1 className="text-sm font-medium text-gray-600 m-2">OR</h1>
            </div>
            <form onSubmit={handleSubmit} method='POST'>
              <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                <div className="">
                  <input onChange={handleChange} type="email" value={email} name='email' placeholder="Email" className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-[#007fff] focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" required />
                </div>
                <div className="">
                  <AiOutlineEye onClick={ptype1} className={`ml-52 md:ml-[19rem] mt-3 text-lg absolute cursor-pointer ${display1}`} /> <AiOutlineEyeInvisible onClick={ptype2} className={`ml-52 md:ml-[19rem] mt-3 text-lg absolute cursor-pointer ${display2}`} />
                  <input ref={ref} onChange={handleChange} type="password" name='password' value={password} placeholder="Password" className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-[#007fff] focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" required />
                </div>
              </div>
              <div className="text-center md:flex md:justify-center md:items-center md:space-x-12 pt-2">
                <div><input type="checkbox" className='mr-1' /><label htmlFor="check">Remember Me</label></div>
                <div className='text-[#007fff]'><Link href={'/forgot'}>Forgot your password?</Link></div>
              </div>
              <div className="text-center mt-3">
                <button className="px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-[#007fff] to-[#4db9fc]  font-medium m-2 mb-6 ">Sign In</button>
              </div>
            </form>
          </div>
          <div className="h-[100%] w-full md:w-1/3  bg-gradient-to-l from-[#007fff] to-[#4db9fc]  items-center flex justify-center shadow-2xl shadow-black">
            <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
              <h1 className="text-5xl">New Here?</h1>
              <h1 className="">Sign Up and discover new oppurtinities here</h1>
              <Link href={'/signup'}><button className="mt-2 bg-white rounded-2xl px-4 text-[#007fff] pt-1 pb-2">SignUp</button></Link>
            </div>
          </div>
        </div>
      </div>
      <Script src="https://kit.fontawesome.com/290d4f0eb4.js" crossorigin="anonymous"></Script>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
    </div>
  )
}

export default Login