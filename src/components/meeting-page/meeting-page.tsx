import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import './meeting-page.scss';
import { getMeetingByIdAsync } from '../../store/meetings';
import {
  getAllMembers,
  getAuthorizationStatus,
  getJoinedMembersByDate,
  getSingleMeeting
} from '../../store/selectors';
import { scrollToTop } from '../../utils/utils';
import Page from '../page/page';
import { Meeting } from '../../types/meeting';
import Thumbler from '../thumbler/thumbler';
import { AuthorizationStatus, RatingName } from '../../const';
import Rating from '../rating/rating';

function MeetingPage() {
  scrollToTop();
  const params = useParams();
  const meetingId = params.id;
  const members = useSelector(getAllMembers);
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [choosedBy, setChoosedBy] = useState(0);
  const [isComplete, setIsComplite] = useState(false);
  const [participant, setParticipant] = useState([]);

  const now = `${moment()}`;

  const auth = useSelector(getAuthorizationStatus);
  const meeting = useSelector(getSingleMeeting);
  const currentMembers = useSelector(getJoinedMembersByDate(now));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeetingByIdAsync(Number(meetingId)));
  }, [dispatch, meetingId]);

  if (!meeting) {
    return <div> No meeting</div>;
  }

  const handleSubmit = () => {
    const changedMeeting: Meeting = {
      id: meeting.id,
      date: date || meeting.date,
      title: bookName || meeting.title,
      author: author || meeting.author,
      cover: {
        url: ''
      },
      chosenById: choosedBy || meeting.chosenById,
      isComplete: true,
      participants: participant || meeting.participants
    };

    console.log(isComplete);

    console.log('changedMeeting', changedMeeting);
    return changedMeeting;
  };

  return (
    <Page>
      <section className="meeting-page container">
        {auth !== AuthorizationStatus.Auth ? (
          <Fragment>
            <h1>
              {meeting?.title} by {meeting.author}
            </h1>
            <section>
              {meeting?.participants.map((participant) => {
                return (
                  <>
                    <div>
                      {
                        members.find((member) => member.id === participant.id)
                          ?.firstName
                      }{' '}
                      {
                        members.find((member) => member.id === participant.id)
                          ?.lastName
                      }
                    </div>
                  </>
                );
              })}
            </section>
          </Fragment>
        ) : (
          <Fragment>
            <form action="submit">
              <fieldset>
                <label htmlFor="">Name</label>
                <input
                  onChange={(e) => setBookName(e.target.value)}
                  type="text"
                  defaultValue={meeting.title}
                />
              </fieldset>

              <fieldset>
                <label htmlFor="">Author</label>
                <input
                  onChange={(e) => setAuthor(e.target.value)}
                  type="text"
                  defaultValue={meeting.author}
                />
              </fieldset>

              <fieldset>
                <label htmlFor="">Choosed by</label>
                <select
                  onChange={(e) => setChoosedBy(Number(e.target.value))}
                  name="members"
                  defaultValue={meeting.chosenById}
                >
                  {members.map((member) => (
                    <option value={member.id}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset>
                <label htmlFor="">Meeting date</label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  defaultValue={meeting?.date}
                />
              </fieldset>

              <fieldset>
                <label htmlFor="">Participants and rating</label>
                {currentMembers.map((currentMember) => {
                  const alo = meeting.participants.find(
                    (participant) => participant.id === currentMember.id
                  );
                  return (
                    <fieldset className="participant-controll-field">
                      <Thumbler
                        booleanValue={alo != undefined ? alo.isVisited : false}
                      />
                      <p>
                        {currentMember.firstName} {currentMember.lastName}
                      </p>
                      <Rating name={RatingName.Controlled} />
                    </fieldset>
                  );
                })}
              </fieldset>
            </form>
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </Fragment>
        )}
      </section>
    </Page>
  );
}

export default MeetingPage;
