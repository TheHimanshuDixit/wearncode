import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subtotal, setSubTotal] = useState(0)

  useEffect(() => {
    const newCart = localStorage.getItem('cart');
    try {
      if (newCart) {
        setCart(JSON.parse(newCart));
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

  const clearCart = () => {
    setCart({});
    saveCart({});
  }

  return (
    <>
      <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} />
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subtotal={subtotal} {...pageProps} />
      <Footer />
    </>
  )
}
