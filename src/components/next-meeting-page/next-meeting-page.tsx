import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';

import './next-meeting-page.css';
import Page from '../page/page';
import { getChoosingParticipant, getNextMeeting, getParticipants } from '../../store/selectors';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
import { completeMeeting } from '../../services/api';

function NextMeetingPage(): JSX.Element {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false)
  const [checkedUser, setCheckedUsers] = useState<{ [key: string]: boolean }>({})
  const participants = useSelector(getParticipants)
  const nextMeeting = useSelector(getNextMeeting)
  const choosingPerson = useSelector(getChoosingParticipant)

  if (!nextMeeting) return <div>No next meeting</div>;

  const clickPlusHandler = () => {
    if (isActive) {
      setActive(false);
    } else {
      setActive(true)
    }
  }

  const checkedHandler = (evt: FormEvent<HTMLInputElement>, id: number) => {
    setCheckedUsers({
      ...checkedUser,
      [id]: evt.currentTarget.checked
    })
  }

  const onSave = () => {
    const meeting = {
      ...nextMeeting,
      persons: Object.keys(checkedUser).map(key => ({ id: Number(key), rating: 1 })),
      isComplete: true,
    }
    dispatch(completeMeeting(meeting))
  }


  return (
    <Page>
      <section className="next-meeting container">
        <section className="next-meeting-block">
          <h3 className="next-meeting-block__title">Book</h3>
          <div className="next-meeting__book-title">{nextMeeting.title}</div>
          <span>by</span>
          <div className="next-meeting__book-author">{nextMeeting.author}</div>
        </section>

        <section className="next-meeting-block">
          <h3 className="next-meeting-block__title">Choosen By:</h3>
          <div className="next-meeting__participant">
            <Link to={`/participant/${choosingPerson?.id}`}>
              {`${choosingPerson?.firstName} ${choosingPerson?.lastName}`}
            </Link>
          </div>
        </section>

        <section className="next-meeting-block">
          <h3 className="next-meeting-block__title">Meeting Date:</h3>
          <div className="next-meeting__date">{formatDate(nextMeeting.date)}</div>
        </section>

        <section className="next-meeting-block">
          <h3 className="next-meeting-block__title">Add participants:</h3>
          <div onClick={() => clickPlusHandler()} className="plus">+</div>
          {isActive && (
            <>
              <form className="participants-form" action="">
                {participants.map(participant => (
                  <fieldset className="participants-form__participant" key={participant.id}>
                    <div>
                      <input onChange={(evt) => { checkedHandler(evt, participant.id) }} id={`${participant.id}+${participant.lastName}`} type="checkbox" />
                      <label htmlFor={`${participant.id}+${participant.lastName}`}>{participant.firstName} {participant.lastName}</label>
                    </div>
                    {/* {checkedUser[participant.id] && (
                    <Rating />
                  )} */}
                  </fieldset>
                ))
                }
              </form>
              <button onClick={onSave} className="btn" type="submit">Submit and close meeting</button>
            </>
          )}
        </section>

      </section >
    </Page>
  )
}

export default NextMeetingPage;