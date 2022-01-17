import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './header.css';

function Header(): JSX.Element {
  return (
    <header className="header container">
      <Link to={AppRoute.Root}><h1 className="header__title">Book Club</h1></Link>
      <Link to={AppRoute.Root}><img className="header__logo" src="https://img.icons8.com/clouds/100/000000/book-shelf.png" alt="logo" /></Link>
    </header>

  )
}

export default Header;