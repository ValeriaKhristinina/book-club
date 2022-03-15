import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/selectors';
import { requireLogout } from '../../store/user';
import './header.scss';

function Header(): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus)
  const isAuth = authorizationStatus === AuthorizationStatus.Auth

  const handleLogout = () => {
    dispatch(requireLogout())
  }

  return (
    <header className="header container">
      <section className='header-logo'>
        <Link to={AppRoute.Root} className="header-logo__link">
          <h1 className="header__title">Book Club</h1>
          {/* <img className="header__logo" src="https://img.icons8.com/clouds/100/000000/book-shelf.png" alt="logo" /> */}
        </Link>
      </section>
      <section className='header-login'>
        {!isAuth && (
          <Link to={AppRoute.Login} className="header-login__link">Login</Link>
        )}

        {isAuth && (
          <span onClick={handleLogout} className="header-login__link">Logout</span>
        )

        }
      </section>
    </header>

  )
}

export default Header;