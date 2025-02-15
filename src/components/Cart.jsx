import Modal from "./UI/Modal.jsx";
import {useAppContext} from "../context/AppContext.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Button from "./UI/Button.jsx";

export function Cart({visible, onSubmit, onClose}) {
  const {cartItems, getCartTotal, removeFromCart, addToCart} = useAppContext();
  return (
    <Modal visible={visible} className="cart" onClose={onClose}>
      <h2>Your Cart</h2>
      <ul>
        {
          cartItems.map(item => (
            <li key={item.id} className="cart-item">
              {item.name} - {item.quantity}x {currencyFormatter.format(item.price)}
              <div className="cart-item-actions">
                <button onClick={() => {
                  removeFromCart(item)
                }}>-
                </button>
                <p>{item.quantity}</p>
                <button onClick={() => {
                  addToCart(item)
                }}>+
                </button>
              </div>
            </li>
          ))
        }
      </ul>
      <div className="cart-total">${getCartTotal()}</div>
      <div className="modal-actions">
        <Button textOnly onClick={() => {
          onClose();
        }}>Close
        </Button>
        {
          cartItems.length > 0 &&
          <Button onClick={onSubmit}>Go to Checkout</Button>
        }
      </div>
    </Modal>
  );
}