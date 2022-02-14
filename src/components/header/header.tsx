import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/selectors';
import './header.css';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus)
  return (
    <header className="header container">
      <section className='header-logo'>
        <Link to={AppRoute.Root} className="header-logo__link">
          <h1 className="header__title">Book Club</h1>
          <img className="header__logo" src="https://img.icons8.com/clouds/100/000000/book-shelf.png" alt="logo" />
        </Link>
      </section>
      <section className='header-login'>
        {authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown && (
          <Link to={AppRoute.Login} className="header-login__link">Login</Link>
        )}

        {authorizationStatus === AuthorizationStatus.Auth && (
          <a className="header-login__link">Logout</a>
        )

        }
      </section>
    </header>

  )
}

export default Header;