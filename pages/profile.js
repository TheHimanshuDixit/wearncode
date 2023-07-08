import React, { useEffect, useState } from 'react'
import router from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [oldpassword, setOldpassword] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [passchange, setPasschange] = useState(false)
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [caddress, setCaddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState('')



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        else {
            fetch('/api/getuser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .then(data => {
                    setName(data.user.name)
                    setEmail(data.user.email)
                    setPhone(data.user.phone)
                    setOldpassword(data.password)
                    if (data.user.address) {
                        const details = data.user.address.split(',')
                        if (details[0]) {
                            setAddress(details[0])
                        }
                        if (details[1]) {
                            setCity(details[1])
                        }
                        if (details[2]) {
                            setState(details[2])
                        }
                        if (details[3]) {
                            setPincode(details[3])
                        }
                    }
                }
                )
                .catch(err => console.log(err))
        }
    }, [])

    const onChange = (e) => {
        const { name, value } = e.target
        if (name == 'name') {
            setName(value)
        }
        else if (name == 'phone') {
            setPhone(value)
        }
        else if (name == 'address') {
            setAddress(value)
        }
        else if (name == 'password') {
            setPassword(value)
        }
        else if (name == 'cpassword') {
            setCpassword(value)
        }
        else if (name == 'city') {
            setCity(value)
        }
        else if (name == 'state') {
            setState(value)
        }
        else if (name == 'pincode') {
            setPincode(value)
        }
        setCaddress(address + ',' + city + ',' + state + ',' + pincode);
    }

    const handleClick = (e) => {
        e.preventDefault()
        if (password && password != cpassword) {
            alert("Passwords do not match")
            return
        }
        else {
            setPassword(oldpassword);
        }
        const token = localStorage.getItem('token')
        fetch('/api/updateuser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                name,
                phone,
                password,
                caddress
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error('Something went wrong', {
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
                    toast.success('Details Updated successfully', {
                        position: "bottom-left",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setPassword('')
                    setCpassword('')
                    setPasschange(false)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="bg-gray-200 min-h-screen pt-2 font-mono">
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
            <div className="container mx-auto">
                <div className="inputs w-full max-w-2xl p-6 mx-auto">
                    <h2 className="text-2xl text-gray-900">Update Your Account</h2>
                    <form className="mt-6 border-t border-gray-400 pt-4">
                        <div className='flex flex-wrap -mx-3 mb-6'>
                            <div className='w-full md:w-full px-3 mb-6'>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-text-1'>email address</label>
                                <input value={email} name='email' className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' type='email' placeholder='Enter email' readOnly />
                            </div>
                            {!passchange ? <div className='w-full md:w-full px-3 mb-6 '>
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>password</label>
                                <button onClick={() => { setPasschange(true) }} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">Change your password</button>
                            </div> : <div className="flex items-center justify-between mt-4">
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label htmlFor='password' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Password</label>
                                    <input id='password' name='password' value={password} onChange={onChange} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='password' />
                                </div>
                                <div className='w-full md:w-1/2 px-3 mb-6'>
                                    <label htmlFor='cpassword' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Confirm Password</label>
                                    <input id='cpassword' name='cpassword' value={cpassword} onChange={onChange} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='password' />
                                </div>
                                <button onClick={() => { setPasschange(false) }} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md ">Cancel</button>
                            </div>}

                            <div className="personal w-full border-t border-gray-400 pt-4">
                                <h2 className="text-2xl text-gray-900">Personal info:</h2>
                                <div className="flex items-center justify-between mt-4">
                                    <div className='w-full md:w-1/2 px-3 mb-6'>
                                        <label htmlFor='name' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Name</label>
                                        <input id='name' name='name' value={name} onChange={onChange} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' required />
                                    </div>
                                    <div className='w-full md:w-1/2 px-3 mb-6'>
                                        <label htmlFor='phone' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Phone No.</label>
                                        <input id='phone' name='phone' value={phone} onChange={onChange} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='number' required />
                                    </div>
                                </div>
                                <div className='w-full md:w-full px-3 mb-6'>
                                    <label htmlFor='address' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Address</label>
                                    <textarea id='address' name='address' value={address} onChange={onChange} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' required ></textarea>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className='w-full md:w-1/2 px-3 mb-6'>
                                        <label htmlFor='city' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >City</label>
                                        <input id='city' name='city' value={city} onChange={onChange} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' required />
                                    </div>
                                    <div className='w-full md:w-1/2 px-3 mb-6'>
                                        <label htmlFor='state' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >State</label>
                                        <input id='state' name='state' value={state} onChange={onChange} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text' required />
                                    </div>
                                    <div className='w-full md:w-1/2 px-3 mb-6'>
                                        <label htmlFor='pincode' className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Pincode</label>
                                        <input id='pincode' name='pincode' value={pincode} onChange={onChange} className='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='number' required />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleClick} className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3" type="submit">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile