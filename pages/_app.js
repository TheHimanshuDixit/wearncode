import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subtotal, setSubTotal] = useState(0)
  const router = useRouter()

  useEffect(() => {
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
  }, [])


  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
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
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Navbar key={subtotal} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
      <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
      <Footer />
    </>
  )
}
