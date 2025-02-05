import {Header} from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import {Cart} from "./components/Cart.jsx";

function App() {
  return (
    <AppContextProvider>
      <Header/>
      <Meals/>
      <Cart/>
    </AppContextProvider>
  );
}

export default App;
