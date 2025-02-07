import logo from '../assets/logo.jpg'
import {Cart} from "./Cart.jsx";
import {useState} from "react";

export function Header() {
  const [visible, setVisible] = useState(false);

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
          <button className="text-button" onClick={() => {
            setVisible(true)
          }}>Cart (0)
          </button>
        </nav>
      </header>
      <Cart visible={visible} onClose={() => setVisible(false)}/>

      {/*after submitting cart this below component should show*/}
      {/*<Checkout open={openCart}/>*/}
      {/*after submitting form component this below component should show*/}
      {/*<checkoutResult open={openCart}/>*/}
    </>
  )
}