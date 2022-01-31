import { Link } from "react-router-dom";
import './error-page.css';
import { AppRoute } from '../../const';

function ErrorPage(): JSX.Element {
  return (
    <section className="error-page container">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to={AppRoute.Root}>Go to main page</Link>
    </section>
  )
}

export default ErrorPage;