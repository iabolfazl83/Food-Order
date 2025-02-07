import Dialog from "./Dialog.jsx";
import {useAppContext} from "../context/AppContext.jsx";

export function Cart({visible, onClose}) {
  const {cartItems, setCartItems} = useAppContext();

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, {...item, quantity: 1}]);
    }
  };


  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  return (
    <Dialog visible={visible}>
      {
        (close) => (
          <div className="cart">
            <h2>Your Cart</h2>
            <ul>
              <li className="cart-item"></li>
            </ul>
            <div className="modal-actions">
              <button className="text-button" onClick={() => {
                close();
                onClose();
              }}>Close
              </button>
              <button className="button">Go to Checkout</button>
            </div>
          </div>
        )
      }
    </Dialog>
  );
}