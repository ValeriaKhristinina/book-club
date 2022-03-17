import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './main-page.scss';
import Page from '../page/page';
import { AppRoute, DEFAULT_COVER_URL } from '../../const';
import { getMembers, getChoosingMember, getCompletedMeetings, getNextMeeting } from '../../store/selectors';
import { checkVisitingParticipants, createNewQueque, formatDate } from '../../utils/utils';
import CardWrapper from '../card-wrapper/card-wrapper';
import Card from '../card/card';
import moment from 'moment';


function MainPage(): JSX.Element {

  const members = useSelector(getMembers);
  const meetings = useSelector(getCompletedMeetings);
  const choosingPerson = useSelector(getChoosingMember)
  const nextMeeting = useSelector(getNextMeeting)

  const lastFourMeetings = meetings.slice(-4);
  const visitingParticipants = checkVisitingParticipants(lastFourMeetings, members);
  const newQueque = createNewQueque(choosingPerson, members, visitingParticipants);
  const lastThreeMeetings = meetings.slice(-3).reverse()

  const diff = moment.duration(moment().diff(meetings[0].date));
  const bookClubAge = diff.years() + ' years ' + diff.months() + ' month'

  const bookCover = nextMeeting?.cover ? nextMeeting.cover.url : DEFAULT_COVER_URL

  return (
    <Page>
      <section className="main-page">
        <section className="main-content container">
          <section className='main-content__block statistic'>
            <CardWrapper additionalClass='card-wrapper__statistic'>
              <p>{bookClubAge}</p>
            </CardWrapper>
            <CardWrapper additionalClass='card-wrapper__statistic'>
              <p>{members.length} members</p>
            </CardWrapper>
            <CardWrapper additionalClass='card-wrapper__statistic'>
              <p>{meetings.length} meetings</p>
            </CardWrapper>
          </section>

          <section className='main-content__block next'>
            <div className='next-block'>
              <h1 className='title'>Next Meeting:</h1>
              {nextMeeting && (
                <CardWrapper additionalClass='next-book'>
                  <>
                    <div className='next-book__cover'>
                      <img src={bookCover} alt="book_cover" />
                    </div>
                    <div className='next-book__info'>
                      <h1 className='subtitle'>
                        {nextMeeting.title}
                        <br />
                        by {nextMeeting.author}
                      </h1>

                      <h1 className='subtitle'>
                        Choosen by:&nbsp;
                        <Link to={`/member/${nextMeeting.chosenById}`} className='queque-list__item'>
                          {`${nextMeeting.chosenByUser?.firstName} ${nextMeeting.chosenByUser?.lastName}`}
                        </Link>
                      </h1>
                      <p className='subtitle'>See you {formatDate(nextMeeting.date)}</p>
                    </div>

                  </>
                </CardWrapper>
              )}
            </div>

            <div className='next-block'>
              <h1 className='title'>Next Chosing Member:</h1>
              <CardWrapper>
                <ul className="queque-list">
                  {newQueque.slice(0, 3).map(person => (
                    <li className="queque-list__item" key={person.id}>
                      <Link to={`/member/${person.id}`}>
                        {person.firstName} {person.lastName}
                      </Link>
                    </li>
                  ))}
                  <li className='queque-list__item queque-list__item--show'>
                    <Link to={AppRoute.Members} className="link">...</Link>
                  </li>
                </ul>
              </CardWrapper>
            </div>
          </section>

          <section className='main-content__block past'>
            <h1 className='title'>Last Meetings</h1>
            <section className='past__meetings cards'>
              {lastThreeMeetings.map((meeting) => (
                <Card meeting={meeting} key={meeting.id} />
              ))}
            </section>
            <Link to={AppRoute.AllMeetings} className="link">See all past meetings..</Link>
          </section>
        </section>
      </section >
    </Page >
  )
}

export default MainPage;