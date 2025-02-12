import {createContext, useContext, useReducer} from "react";

const initialState = {
  cartItems: [],
}

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

function cartReducer(state, action) {
  switch (action.type) {

    case ADD_ITEM: {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);

      let updatedCart;
      if (existingItem) {
        updatedCart = state.cartItems.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
      } else {
        updatedCart = [...state.cartItems, {...item, quantity: 1}];
      }

      return {...state, cartItems: updatedCart};
    }

    case REMOVE_ITEM: {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);

      if (!existingItem) return state; // Item doesn't exist

      let updatedCart;
      if (existingItem.quantity === 1) {
        updatedCart = state.cartItems.filter(cartItem => cartItem.id !== item.id);
      } else {
        updatedCart = state.cartItems.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        );
      }

      return {...state, cartItems: updatedCart};
    }

    default:
      return state;
  }
}

export const AppContext = createContext({
  cartItems: [],
  addToCart: (item) => {},
  removeFromCart: (item) => {},
  getCartTotal: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

const AppContextProvider = ({children}) => {
  const [cart, dispatchCartActions] = useReducer(cartReducer, initialState);

  const addToCart = item => {
    dispatchCartActions({
      type: ADD_ITEM,
      payload: item,
    })
  }

  const removeFromCart = item => {
    dispatchCartActions({
      type: REMOVE_ITEM,
      payload: item,
    })
  }

  const getCartTotal = () => {
    return cart.cartItems.reduce((total, item) => (total + item.price * item.quantity), 0).toFixed(2);
  };

  const appContextValues = {
    cartItems: cart.cartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
  }

  return (
    <AppContext.Provider value={appContextValues}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider;