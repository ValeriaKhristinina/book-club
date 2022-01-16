import './header.css';

function Header(): JSX.Element {
  return (
    <header className="header container">
      <h1 className="header__title">Book Club</h1>
      <img className="header__logo" src="https://img.icons8.com/clouds/100/000000/book-shelf.png" alt="logo" />
    </header>
  )
}

export default Header;