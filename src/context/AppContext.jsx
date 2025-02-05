import {createContext, useState} from "react";

export const appContext = createContext({
  open: false,
  setOpen: () => {
  },
});

const AppContextProvider = ({children}) => {
  const [open, setOpen] = useState(false);
  const appContextValues = {
    open,
    setOpen,
  }

  return (
    <appContext.Provider value={appContextValues}>{children}</appContext.Provider>
  )
}

export default AppContextProvider;
