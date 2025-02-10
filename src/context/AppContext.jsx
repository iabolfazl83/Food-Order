import {createContext, useContext, useState} from "react";

export const appContext = createContext({
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => {},
});

export function useAppContext() {
  return useContext(appContext);
}

const AppContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

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
    return cartItems.reduce((total, item) => (total + item.price * item.quantity), 0).toFixed(2);
  };

  const appContextValues = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
  }

  return (
    <appContext.Provider value={appContextValues}>{children}</appContext.Provider>
  )
}

export default AppContextProvider;