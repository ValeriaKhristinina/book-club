import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMeetingByIdAsync } from '../../store/meetings';
import { getAllMembers, getSingleMeeting } from '../../store/selectors';
import { scrollToTop } from '../../utils/utils';
import Page from '../page/page';
import {Meeting} from '../../types/meeting';
import Thumbler from '../thumbler/thumbler';

function MeetingPage() {
  scrollToTop();
  const params = useParams();
  const meetingId = params.id;
  const members = useSelector(getAllMembers);
  const [isForm, setisForm] = useState(true);
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('')
  const [choosedBy, setChoosedBy] = useState(0)
  const [isComplete, setIsComplite] = useState (false)
  const [participant, setParticipant] = useState([])

  const meeting = useSelector(getSingleMeeting);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeetingByIdAsync(Number(meetingId)));
  }, [dispatch, meetingId]);


  if(!meeting) {
    return <div> No meeting</div>
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
    isComplete: isComplete || meeting.isComplete,
    participants: participant || meeting.participants,

  }

  console.log('changedMeeting',changedMeeting)
  return changedMeeting
 } 

  return (
    <Page>
      <section className="meeting-page container">
        {!isForm ? (
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
              <input onChange ={(e)=> setAuthor(e.target.value)} type="text" defaultValue={meeting.author} />
            </fieldset>

            <fieldset>
              <label htmlFor="">Choosed by</label>
              <select onChange={(e)=> setChoosedBy(Number(e.target.value))} name="members" defaultValue={meeting.chosenById}>
                {members.map((member) => (
                  <option
                    value={member.id}
                  >
                    {member.firstName} {member.lastName}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <label htmlFor="">Meeting date</label>
              <input onChange={(e) => setDate(e.target.value)} type="date" defaultValue={meeting?.date} />
            </fieldset>

            <fieldset>
              <label htmlFor="">Participants and rating</label>
              <fieldset>
                <p>Lera Khristinina</p>
                <div>12345</div>
                <Thumbler booleanValue={true}/>
              </fieldset>
            </fieldset>
          </form>
          <button onClick={handleSubmit} type='submit'>Submit</button>
          </Fragment>
        )}
      </section>
    </Page>
  );
}

export default MeetingPage;
