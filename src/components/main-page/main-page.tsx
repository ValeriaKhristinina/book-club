import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './main-page.css';
import Rating from '../rating/rating';

function MainPage(): JSX.Element {

  return (
    <section className="main-page">

      <section className="main-content container">
        <section className="main-content__block">
          <h3 className="main-content__title">Next meeting:</h3>
          <div>
            <Link to={AppRoute.Meeting}><time>DATE</time></Link>
          </div>
        </section>
        <section className="main-content__block">
          <h3 className="main-content__title">Will discuss:</h3>
          <div>BOOK</div>
        </section>
        <section className="main-content__block main-content__block--all-width">
          <h3 className="main-content__title">Who choose next book :</h3>
          <div>NAME</div>
        </section>
        <section className="main-content__block">
          <h3 className="main-content__title">Last discussed book:</h3>
          <div>BOOK_NAME</div>
        </section>
        <section className="main-content__block">
          <h3 className="main-content__title">Average raiting last book:</h3>
          <Rating />
        </section>
      </section>
    </section >
  )
}

export default MainPage;