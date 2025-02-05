import logo from '../assets/logo.jpg'
import {useContext} from "react";
import {appContext} from "../context/AppContext.jsx";

export function Header() {
  const {setOpen} = useContext(appContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="resurant logo"/>
        <h1>
          REACTFOOD
        </h1>
      </div>
      <nav>
        <button className="text-button" onClick={() => {setOpen(true)}}>Cart (0)</button>
      </nav>
    </header>
  )
}