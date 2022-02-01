import { useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';

import './meeting-page.css';
import Rating from '../rating/rating';
import { getChoosingParticipant, getNextMeeting, getParticipants } from '../../store/selectors';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/utils';

function NextMeetingPage(): JSX.Element {
  const [isActive, setActive] = useState(false)
  const [checkedUser, setCheckedUsers] = useState<{ [key: string]: boolean }>({})
  const participants = useSelector(getParticipants)
  const nextMeeting = useSelector(getNextMeeting)
  const choosingPerson = useSelector(getChoosingParticipant)

  const clickPlusHandler = () => {
    if (isActive) {
      setActive(false);
    } else {
      setActive(true)
    }
  }

  const checkedHandler = (evt: FormEvent<HTMLInputElement>, id: number) => {
    if (evt.currentTarget.checked) {
      setCheckedUsers({
        ...checkedUser,
        [id]: true
      })
    } else {
      setCheckedUsers({
        ...checkedUser,
        [id]: false
      })
    }
  }


  return (
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
                  {checkedUser[participant.id] && (
                    <Rating />
                  )}
                </fieldset>
              ))
              }
            </form>
            <button className="btn btn--wide" type="submit">Submit and close meeting</button>
          </>
        )}
      </section>

    </section >
  )
}

export default NextMeetingPage;