import {Header} from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import AppContextProvider from "./context/AppContext.jsx";

function App() {
  return (
    <AppContextProvider>
      <Header/>
      <Meals/>
    </AppContextProvider>
  );
}

export default App;
