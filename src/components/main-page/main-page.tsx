import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './main-page.scss';
import Page from '../page/page';
import { AppRoute, RatingName } from '../../const';
import Rating from '../rating/rating';
import { getParticipants, getLastBook, getChoosingParticipant, getCompletedMeetings, getNextMeeting } from '../../store/selectors';
import { calculateAverageRating, checkVisitingParticipants, createNewQueque, formatDate, widthRating } from '../../utils/utils';


function MainPage(): JSX.Element {
  const [isActive, setActive] = useState(false)

  const participants = useSelector(getParticipants);
  const meetings = useSelector(getCompletedMeetings);
  const lastBook = useSelector(getLastBook)
  const choosingPerson = useSelector(getChoosingParticipant)
  const nextMeeting = useSelector(getNextMeeting)


  const lastFourMeetings = meetings.slice(-4);
  const visitingParticipants = checkVisitingParticipants(lastFourMeetings, participants);

  const newQueque = createNewQueque(choosingPerson, participants, visitingParticipants);

  const lastChoosingParticipant = participants.find((person) => person.id === lastBook.chosenById)
  const nextChoosingParticipant = newQueque[0]
  newQueque.splice(0, 1)

  const clickActiveHandler = () => isActive ? setActive(false) : setActive(true)

  const averageRating = calculateAverageRating(lastBook);

  return (
    <Page>
      <section className="main-page">
        <section className="main-content container">
          <section className="main-content__block">
            <h3 className="main-content__title">Next meeting:</h3>
            <div className="main-content__block-wrapper">
              <time>{formatDate(nextMeeting?.date)}</time>
              <div><Link className="link-see-all" to={AppRoute.AllMeetings}>See all past meetings</Link></div>
            </div>
          </section>
          <section className="main-content__block">
            <h3 className="main-content__title">Will discuss:</h3>
            <div>
              <Link className="next-meeting-link" to={AppRoute.NextMeeting}>{nextMeeting?.title}</Link>
            </div>
          </section>
          <section className="main-content__block">
            <h3 className="main-content__title">Chosen by:</h3>
            <div>
              <Link to={`/participant/${choosingPerson?.id}`}>
                {`${choosingPerson?.firstName} ${choosingPerson?.lastName}`}
              </Link>
            </div>
          </section>
          <section className="main-content__block main-content__block--all-width">
            <h3 className="main-content__title">Who choose next book :</h3>
            <div className="main-content__subtitle"><Link to={`/participant/${nextChoosingParticipant?.id}`}>{nextChoosingParticipant?.firstName} {nextChoosingParticipant?.lastName}</Link></div>
            <div onClick={clickActiveHandler} className="link-see-all">{!isActive ? '+ See all list' : '- See less'}</div>
            {isActive && (
              <ul className="queque-list">
                {newQueque.map(person => (
                  <li className="queque-list__item" key={person.id}>
                    <Link to={`/participant/${person.id}`}>
                      {person.firstName} {person.lastName}
                    </Link>
                  </li>
                ))}
              </ul>
            )
            }
          </section>
          <section className="main-content__block">
            <h3 className="main-content__title">Last discussed book:</h3>
            <div className="last-book">
              <h3>{lastBook.title}</h3>
              <p>{lastBook.author}</p>
            </div>
          </section>
          <section className="main-content__block">
            <h3 className="main-content__title">Chosen by:</h3>
            <div><Link to={`/participant/${lastChoosingParticipant?.id}`}>{lastChoosingParticipant?.firstName} {lastChoosingParticipant?.lastName}</Link></div>
          </section>
          <section className="main-content__block">
            <h3 className="main-content__title">Average raiting last book:</h3>
            <Rating name={RatingName.ReadOnly} averageValue={widthRating(averageRating)} />
            <div className="raiting-last-book">
              {averageRating}
            </div>
          </section>
        </section>
      </section >
    </Page>
  )
}

export default MainPage;