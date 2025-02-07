import {createContext, useContext, useState} from "react";

export const appContext = createContext({
  cartItems: [],
  setCartItems: () => {},
});

export function useAppContext() {
  return useContext(appContext);
}

const AppContextProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([])
  const appContextValues = {
    cartItems,
    setCartItems,
  }

  return (
    <appContext.Provider value={appContextValues}>{children}</appContext.Provider>
  )
}

export default AppContextProvider;