import Link from 'next/link'
import Script from 'next/script'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/')
        }
    }, [])

    const [email, setEmail] = useState('');
    const [check, setCheck] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [code, setCode] = useState('');
    const [hide, setHide] = useState(true);

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name === 'newpassword') {
            setNewpassword(e.target.value);
        }
        else if (e.target.name === 'confirmpassword') {
            setConfirmpassword(e.target.value);
        }
        else if (e.target.name === 'code') {
            setCode(e.target.value);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.warning("It's take some time!! please wait", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        const data = await fetch('/api/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        const response = await data.json();
        if (response.error) {
            toast.error(response.error, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            setCheck(response.random);
            setHide(false);
            toast.success(response.success, {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleReset = async (e) => {
        e.preventDefault();

        if (check != code) {
            toast.error('Code does not match', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (newpassword != confirmpassword) {
            toast.error('Password does not match', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        else {
            const data = await fetch('/api/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: newpassword
                })
            })
            const response = await data.json();
            if (response.error) {
                toast.error(response.error, {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else {
                toast.success(response.success, {
                    position: "bottom-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setHide(true);
                setEmail('');
                setNewpassword('');
                setConfirmpassword('');
                setCode('');
                setCheck('');
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            }
        }
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
                            <h1 className="font-semibold text-xl md:text-5xl text-gray-600 m-2">Forgot Password</h1>
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
                        {hide ? <form action="">
                            <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                                <div className="">
                                    <input onChange={handleChange} name='email' type="email" placeholder="Email" className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-[#007fff] focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" required />
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <button onClick={handleSubmit} className="px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-[#007fff] to-[#4db9fc]  font-medium m-2 mb-6 ">Continue</button>
                            </div>
                        </form> :
                            <form action="">
                                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                                    <div className="">
                                        <input onChange={handleChange} name='code' type="number" placeholder="Enter code send in mail" className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-[#007fff] focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" required />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                                    <div className="">
                                        <input onChange={handleChange} name='newpassword' type="password" placeholder="New Password" className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-[#007fff] focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" required />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                                    <div className="">
                                        <input onChange={handleChange} name='confirmpassword' type="current-password" placeholder="Confirm Password" className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-[#007fff] focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]" required />
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <button onClick={handleReset} className="px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-gradient-to-l from-[#007fff] to-[#4db9fc]  font-medium m-2 mb-6 ">Continue</button>
                                </div>
                            </form>}
                    </div>
                    <div className="h-[100%] w-full md:w-1/3  bg-gradient-to-l from-[#007fff] to-[#4db9fc]  items-center flex justify-center shadow-2xl shadow-black">
                        <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                            <h1 className="text-3xl">Already have an account?</h1>
                            <h1 className="">Login to continue here</h1>
                            <Link href={'/login'}><button className="mt-2 bg-white rounded-2xl px-4 text-[#007fff] pt-1 pb-2">Login</button></Link>
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