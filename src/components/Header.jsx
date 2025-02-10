import logo from '../assets/logo.jpg'
import {Cart} from "./Cart.jsx";
import {useState} from "react";
import {useAppContext} from "../context/AppContext.jsx";
import Checkout from "./Checkout.jsx";
import CheckoutResult from "./CheckoutResult.jsx";
import Button from "./UI/Button.jsx";

export function Header() {
  const [cartVisible, setCartVisible] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState(false);
  const {cartItems} = useAppContext();

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="resurant logo"/>
          <h1>
            REACTFOOD
          </h1>
        </div>
        <nav>
          <Button textOnly onClick={() => {
            setCartVisible(true)
          }}>
            Cart ({cartItems.length})
          </Button>
        </nav>
      </header>

      <Cart visible={cartVisible} onClose={() => setCartVisible(false)} onSubmit={() => {
        setCheckoutVisible(true);
        setCartVisible(false);
      }}/>

      <Checkout visible={checkoutVisible} onClose={() => {
        setCheckoutVisible(false);
        setCheckoutResult(true);
      }}/>

      <CheckoutResult visible={checkoutResult} onClose={() => setCheckoutResult(false)}/>
    </>
  )
}