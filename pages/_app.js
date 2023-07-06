import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
require('dotenv').config()

export default function App({ Component, pageProps }) {
  const [cartQty, setCartQty] = useState(0)
  const [cart, setCart] = useState({})
  const [subtotal, setSubTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState({ value: null })
  const router = useRouter(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {

    router.events.on('routeChangeStart', () => {
      setProgress(50)
    })

    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

    const newCart = localStorage.getItem('cart');
    try {
      if (newCart) {
        setCart(JSON.parse(newCart));
        saveCart(JSON.parse(newCart));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ value: token })
    }
    setKey(Math.random())

  }, [router.query])

  const logout = () => {
    localStorage.clear();
    setUser({ value: null })
    setKey(Math.random())
    router.push('/')
    toast.success('You are successfully logged out', {
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

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let totqty = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
      totqty += myCart[keys[i]].qty;
    }
    setCartQty(totqty);
    setSubTotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = cart;
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      myCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(myCart);
    saveCart(myCart);
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = cart;
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (myCart[itemCode].qty <= 0) {
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = { itemCode: { qty: 1, price, name, size, variant } }
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout');
  }

  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  return (
    <>
      <LoadingBar
        color='#007fff'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
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
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
      {key && <Navbar user={user} key={key} cart={cart} cartQty={cartQty} logout={logout} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />}
      <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
      <Footer />
    </>
  )
}
