import { useSelector } from 'react-redux';
import { useState } from 'react';

import './meeting-page.css';
import Rating from '../rating/rating';
import { getParticipants } from '../../store/selectors';

function NextMeetingPage(): JSX.Element {
  const participants = useSelector(getParticipants)
  const [isActive, setActive] = useState(false)
  const clickPlusHandler = () => {
    if (isActive) {
      setActive(false);
    } else {
      setActive(true)
    }
  }
  return (
    <section className="next-meeting container">
      <section className="next-meeting-block">
        <h3 className="next-meeting-block__title">Book</h3>
        <div className="next-meeting__book-title">TITLE</div>
        <span>by</span>
        <div className="next-meeting__book-author">AUTHOR</div>
      </section>

      <section className="next-meeting-block">
        <h3 className="next-meeting-block__title">Choosen By:</h3>
        <div className="next-meeting__participant">PARTICIPANT</div>
      </section>

      <section className="next-meeting-block">
        <h3 className="next-meeting-block__title">Meeting Date:</h3>
        <div className="next-meeting__date">DATE</div>
      </section>

      <section className="next-meeting-block">
        <h3 className="next-meeting-block__title">Add participants:</h3>
        <div onClick={() => clickPlusHandler()} className="plus">+</div>
        {isActive && (
          <>
            <form className="participants-form" action="">
              {participants.map(participant => (
                <fieldset className="participants-form__participant">
                  <input id={`${participant.id}+${participant.lastName}`} type="checkbox" />
                  <label htmlFor={`${participant.id}+${participant.lastName}`}>{participant.firstName} {participant.lastName}</label>
                  <Rating />
                </fieldset>
              ))
              }
            </form>
            <button className="btn" type="submit">Submit and close meeting</button>
          </>
        )}
      </section>

    </section >
  )
}

export default NextMeetingPage;