import moment from 'moment';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, Rate, DatePicker, Switch } from 'antd';
import { getAllMembers, getJoinedMembersByDate } from '../../store/selectors';
import { Meeting } from '../../types/meeting';
import { Participant } from '../../types/meeting';

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

  const choosedMember = members.find(
    (member) => member.id === meeting.chosenById
  );

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
          <Select
            onChange={(value) => {
              setChoosedBy(Number(value));
            }}
            style={{ width: '50%' }}
            defaultValue={{
              label: `${choosedMember?.firstName} ${choosedMember?.lastName}`,
              value: choosedMember?.id
            }}
            options={members.map((member) => ({
              label: `${member.firstName} ${member.lastName}`,
              value: member.id
            }))}
            showArrow
          />
        </fieldset>

        <fieldset>
          <label htmlFor="">Meeting date</label>
          <DatePicker
            onChange={(value) => setDate(dayjs(value).format())}
            defaultValue={dayjs(meeting.date)}
            allowClear={false}
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
                <Switch
                  defaultChecked={
                    matchParticipant !== undefined
                      ? matchParticipant.isVisited
                      : false
                  }
                />
                <p>
                  {currentMember.firstName} {currentMember.lastName}
                </p>
                <Rate defaultValue={matchParticipant?.rating} />
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
