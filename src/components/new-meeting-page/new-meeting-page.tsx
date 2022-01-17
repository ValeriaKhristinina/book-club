import './new-meeting-page.css';
import { PARTICIPANTS } from '../../const';

function NewMeetingPage(): JSX.Element {
  return (
    <section className="new-meeting-page container">
      <form className="meeting-form" action="">
        <section className="meeting-form-block">
          <h3 className='meeting-form__title'>Next Book:</h3>
          <label htmlFor="reading-book-title">Title: </label>
          <input id="reading-book-title" type="text" />
          <label htmlFor="reading-book-author">Author: </label>
          <input id="reading-book-author" type="text" />
        </section>

        <section className="meeting-form-block">
          <h3 className="meeting-form__title">Who choose:</h3>
          <select name="participants" id="participants">
            {
              PARTICIPANTS.map(participant => {
                return (
                  <option value={participant.id}>{`${participant.firstName} ${participant.lastName}`}</option>
                )
              })
            }
          </select>
        </section>
        <section className="meeting-form-block">
          <h3 className="meeting-form__title">Meeting Date:</h3>
          <label htmlFor="next-date">Choose date: </label>
          <input type="date" id="next-date" name="meeting date" />
        </section>
        <button type="submit">Submit</button>
      </form>

    </section>
  )
}

export default NewMeetingPage;