import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RatingName } from '../../const';
import { getAllMembers, getJoinedMembersByDate } from '../../store/selectors';
import { Meeting } from '../../types/meeting';
import { Participant } from '../../types/meeting';
import Rating from '../rating/rating';
import Thumbler from '../thumbler/thumbler';

type MeetingEditFormProps = {
  meeting: Meeting;
};

function MeetingEditForm({ meeting }: MeetingEditFormProps): JSX.Element {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [choosedBy, setChoosedBy] = useState(0);
  const [participantsMeeting, setParticipantsMeetings] =
    useState<Participant[]>();

  const now = `${moment()}`;
  const members = useSelector(getAllMembers);
  const currentMembers = useSelector(getJoinedMembersByDate(now));

  useEffect(() => {
    setBookName(meeting.title);
    setAuthor(meeting.author);
    setDate(meeting.date);
    setChoosedBy(meeting.chosenById);
    setParticipantsMeetings(meeting.participants);
  }, [meeting]);

  const handleSubmit = () => {
    if (!participantsMeeting) {
      return { id: 0, rating: 0, isVisited: false };
    }
    const changedMeeting: Meeting = {
      id: meeting.id,
      date: date,
      title: bookName,
      author: author,
      cover: {
        url: ''
      },
      chosenById: choosedBy,
      isComplete: true,
      participants: participantsMeeting
    };
    console.log('changedMeeting', changedMeeting);
    return changedMeeting;
  };

  return (
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
            const matchParticipant = meeting.participants.find(
              (participant) => participant.id === currentMember.id
            );
            return (
              <fieldset className="participant-controll-field">
                <Thumbler
                  booleanValue={matchParticipant !== undefined ? matchParticipant.isVisited : false}
                />
                <p>
                  {currentMember.firstName} {currentMember.lastName}
                </p>
                <Rating name={RatingName.Controlled} defaultValue={matchParticipant?.rating}/>
              </fieldset>
            );
          })}
        </fieldset>
      </form>
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
    </Fragment>
  );
}

export default MeetingEditForm;
