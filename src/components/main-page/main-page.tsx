import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import './main-page.scss';
import Page from '../page/page';
import { AppRoute } from '../../const';
import { getParticipants, getLastBook, getChoosingParticipant, getCompletedMeetings, getNextMeeting } from '../../store/selectors';
import { checkVisitingParticipants, createNewQueque, formatDate } from '../../utils/utils';
import CardWrapper from '../card-wrapper/card-wrapper';
import Card from '../card/card';


function MainPage(): JSX.Element {
  // const [isActive, setActive] = useState(false)

  const participants = useSelector(getParticipants);
  const meetings = useSelector(getCompletedMeetings);
  // const lastBook = useSelector(getLastBook)
  const choosingPerson = useSelector(getChoosingParticipant)
  const nextMeeting = useSelector(getNextMeeting)

  const lastFourMeetings = meetings.slice(-4);
  const visitingParticipants = checkVisitingParticipants(lastFourMeetings, participants);
  const newQueque = createNewQueque(choosingPerson, participants, visitingParticipants);
  console.log(newQueque)

  const lastThreeMeetings = meetings.slice(-3).reverse()

  // const lastChoosingParticipant = participants.find((person) => person.id === lastBook.chosenById)
  // const nextChoosingParticipant = newQueque[0]
  // const clickActiveHandler = () => isActive ? setActive(false) : setActive(true)
  // const averageRating = calculateAverageRating(lastBook);

  return (
    <Page>
      <section className="main-page">
        <section className="main-content container">
          <section className='main-content__block statistic'>
            <CardWrapper>
              <p>Average rating: 3032</p>
            </CardWrapper>
            <CardWrapper>
              <p>Members: {participants.length}</p>
            </CardWrapper>
            <CardWrapper>
              <p>Meetings: {meetings.length}</p>
            </CardWrapper>
          </section>

          <section className='main-content__block next'>
            <div className='next-block'>
              <h1 className='main-content__title'>Next Meeting:</h1>
              {nextMeeting && (
                <CardWrapper additionalClass='next-book'>
                  <>
                    <div className='next-book__cover'></div>
                    <div className='next-book__info'>
                      <h1>{nextMeeting.title}</h1>
                      <h1>{nextMeeting.author}</h1>

                      <h1>Choosen by: {`${nextMeeting.chosenByUser?.firstName} ${nextMeeting.chosenByUser?.lastName}`}</h1>
                      <p> Date: {formatDate(nextMeeting.date)}</p>
                    </div>

                  </>
                </CardWrapper>
              )}
            </div>

            <div className='next-block'>
              <h1 className='main-content__title'>Next Chosing Member:</h1>
              <CardWrapper>
                <ul className="queque-list">
                  {newQueque.slice(0, 3).map(person => (
                    <li className="queque-list__item" key={person.id}>
                      <Link to={`/participant/${person.id}`}>
                        {person.firstName} {person.lastName}
                      </Link>
                    </li>
                  ))}
                  <li className='queque-list__item'><Link to={AppRoute.Root}>...</Link></li>
                </ul>
              </CardWrapper>
            </div>
          </section>

          <section className='main-content__block past'>
            <h1 className='main-content__title'>Last Meetings</h1>
            <section className='past__meetings'>
              {lastThreeMeetings.map((meeting) => (
                <Card meeting={meeting} />
              ))}
            </section>
            <Link to={AppRoute.AllMeetings} className="link-see-all">See all past meetings..</Link>
          </section>
        </section>
      </section >
    </Page>
  )
}

export default MainPage;