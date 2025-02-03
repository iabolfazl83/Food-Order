import logo from '../assets/logo.jpg'

export function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="resurant logo"/>
        <h1>
          REACTFOOD
        </h1>
      </div>
      <nav>
        <button>Cart</button>
      </nav>

    </header>
  )
}