import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, DatePicker, Switch, Rate } from 'antd';
import { getAllMembers, getAllMembersByDate } from '../../store/selectors';
import { Meeting } from '../../types/meeting';
import { Participant } from '../../types/meeting';
import { Member } from '../../types/member';
import { changeMeetingAsync } from '../../store/meetings';

type MeetingEditFormProps = {
  meeting: Meeting;
};

function MeetingEditForm({ meeting }: MeetingEditFormProps): JSX.Element {
  const dispatch = useDispatch();
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [choosedBy, setChoosedBy] = useState(0);
  const [participantsMeeting, setParticipantsMeetings] =
    useState<Participant[]>();

  const members = useSelector(getAllMembers);
  const membersByTime = useSelector(getAllMembersByDate(meeting.date));

  console.log('membersByTime', membersByTime);

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

  const handlerChangeVisiting = (event: any, currentMember: Member) => {
    let memberInMeeting = false;
    const cloneParticipants = participantsMeeting?.map((participant) => {
      if (participant.id === currentMember.id) {
        memberInMeeting = true;
        return {
          ...participant,
          isVisited: event
        };
      }
      return participant;
    });
    if (!memberInMeeting) {
      const newParticipant: Participant = {
        id: currentMember.id,
        rating: null,
        isVisited: event
      };
      cloneParticipants?.push(newParticipant);
    }
    setParticipantsMeetings(cloneParticipants);
  };
  const handlerChangeRating = (event: any, currentMember: Member) => {
    let memberInMeeting = false;
    const cloneParticipants = participantsMeeting?.map((participant) => {
      if (participant.id === currentMember.id) {
        memberInMeeting = true;
        return {
          ...participant,
          rating: event
        };
      }
      return participant;
    });
    if (!memberInMeeting) {
      const newParticipant: Participant = {
        id: currentMember.id,
        rating: event,
        isVisited: false
      };
      cloneParticipants?.push(newParticipant);
    }

    setParticipantsMeetings(cloneParticipants);
  };

  const handleSubmit = () => {
    if (!participantsMeeting) {
      return { id: 0, rating: 0, isVisited: false };
    }
    const changedMeeting: Meeting = {
      ...meeting,
      id: meeting.id,
      date: date,
      title: bookName,
      author: author,
      chosenById: choosedBy,
      participants: participantsMeeting
    };
    console.log(changedMeeting);
    dispatch(changeMeetingAsync(changedMeeting));
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
            onChange={(value) => setDate(dayjs(value).format('YYYY-MM-DD'))}
            defaultValue={dayjs(meeting.date)}
            allowClear={false}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="">Participants and rating</label>
          {membersByTime.map((currentMember) => {
            const matchParticipant = meeting.participants.find(
              (participant) => participant.id === currentMember.id
            );
            return (
              <fieldset
                key={currentMember.id}
                className="participant-controll-field"
              >
                <Switch
                  onClick={(e) => handlerChangeVisiting(e, currentMember)}
                  defaultChecked={
                    matchParticipant !== undefined
                      ? matchParticipant.isVisited
                      : false
                  }
                />
                <p>
                  {currentMember.firstName} {currentMember.lastName}
                </p>
                <Rate
                  onChange={(e) => handlerChangeRating(e, currentMember)}
                  defaultValue={matchParticipant?.rating || 0}
                />
              </fieldset>
            );
          })}
        </fieldset>
      </form>
      <button onClick={handleSubmit} type="submit">
        Save
      </button>
    </Fragment>
  );
}

export default MeetingEditForm;
