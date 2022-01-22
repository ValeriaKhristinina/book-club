import { Link } from 'react-router-dom';
import { useState } from 'react';


import './main-page.css';
import { AppRoute } from '../../const';
import { getParticipants, getMeetings } from '../../store/selectors';
import { calculateAverageRating, checkVisitingParticipants, createNewQueque } from '../../utils/utils';
import { useSelector } from 'react-redux';


function MainPage(): JSX.Element {
  const [isActive, setActive] = useState(false)
  const participants = useSelector(getParticipants);
  const meetings = useSelector(getMeetings);

  const choosingPerson = participants[2];
  const lastFourMeetings = meetings.slice(-4);
  const visitingParticipants = checkVisitingParticipants(lastFourMeetings, participants);
  const newQueque = createNewQueque(choosingPerson, participants, visitingParticipants);

  const lastBook = meetings[meetings.length - 1]
  const lastChoosingParticipant = participants.find(person => person.id === lastBook.chosenById)
  const nextChoosingParticipant = newQueque.find(person => person.id === lastBook.chosenById + 1)

  calculateAverageRating(lastBook)

  const clickActiveHandler = () => isActive ? setActive(false) : setActive(true)

  return (

    <section className="main-page">

      <section className="main-content container">
        <section className="main-content__block">
          <h3 className="main-content__title">Next meeting:</h3>
          <div>
            <Link className="next-meeting-link" to={AppRoute.NextMeeting}><time>DATE</time></Link>
            <div><Link className="link-see-all" to={AppRoute.AllMeetings}>See all past meetings</Link></div>
          </div>
        </section>
        <section className="main-content__block">
          <h3 className="main-content__title">Will discuss:</h3>
          <div>BOOK</div>
        </section>
        <section className="main-content__block">
          <h3 className="main-content__title">Chosen by:</h3>
          <div>NAME</div>
        </section>
        <section className="main-content__block main-content__block--all-width">
          <h3 className="main-content__title">Who choose next book :</h3>
          <div className="main-content__subtitle"><Link to={`/participant/${nextChoosingParticipant?.id}`}>{nextChoosingParticipant?.firstName} {nextChoosingParticipant?.lastName}</Link></div>
          <div onClick={clickActiveHandler} className="link-see-all">{!isActive ? '+ See all list' : '- See less'}</div>
          {isActive && (
            <ul className="queque-list">
              {newQueque.map(person => (
                <li className="queque-list__item" key={person.id}><Link to={`/participant/${person.id}`}>{person.firstName} {person.lastName}</Link></li>
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
          <div className="raiting-last-book">
            {calculateAverageRating(lastBook)}
          </div>
        </section>
      </section>
    </section >
  )
}

export default MainPage;