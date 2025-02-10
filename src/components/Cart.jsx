import Dialog from "./Dialog.jsx";
import {useAppContext} from "../context/AppContext.jsx";
import {currencyFormatter} from "../formatting.js";
import Button from "./UI/Button.jsx";

export function Cart({visible, onSubmit, onClose}) {
  const {cartItems, getCartTotal, removeFromCart, addToCart} = useAppContext();
  return (
    <Dialog visible={visible}>
      {
        (close) => (
          <div className="cart">
            <h2>Your Cart</h2>
            <ul>
              {
                cartItems.map(item => (
                  <li key={item.id} className="cart-item">
                    {item.name} - {item.quantity}x ${currencyFormatter.format(item.price)}
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
                close();
                onClose();
              }}>Close
              </Button>
              <Button onClick={onSubmit}>Go to Checkout</Button>
            </div>
          </div>
        )
      }
    </Dialog>
  );
}