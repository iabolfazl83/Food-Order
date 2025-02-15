import {createContext, useContext, useReducer} from "react";

//initialState
const initialState = {
  cartItems: [],
}

//actions
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAR_CART = "CLEAR_CART";

//reducer
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

    case CLEAR_CART: {
      let updatedCart = [];
      return {...state, cartItems: updatedCart};
    }

    default:
      return state;
  }
}

//app ctx
export const AppContext = createContext({
  cartItems: [],
  addToCart: (item) => {
  },
  removeFromCart: (item) => {
  },
  getCartTotal: () => {
  },
  clearCart: () => {
  }
});

//use ctx hook
export function useAppContext() {
  return useContext(AppContext);
}

//ctx provider
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

  const clearCart = () => {
    dispatchCartActions({
      type: CLEAR_CART,
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
    clearCart,
  }

  return (
    <AppContext.Provider value={appContextValues}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider;