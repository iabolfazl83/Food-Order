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

  const allCartItems = cartItems.reduce((totalCartItems, item) => {
    return totalCartItems + item.quantity;
  }, 0)

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
            setCartVisible(true);
          }}>
            Cart ({allCartItems})
          </Button>
        </nav>
      </header>

      <Cart
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        onSubmit={() => {
          setCartVisible(false);
          setCheckoutVisible(true);
        }}/>

      <Checkout
        visible={checkoutVisible}
        onClose={() => setCheckoutVisible(false)} onSubmit={() => {
        setCheckoutVisible(false);
        setCheckoutResult(true);
      }}/>

      <CheckoutResult
        visible={checkoutResult}
        onClose={() => setCheckoutResult(false)}/>
    </>
  )
}