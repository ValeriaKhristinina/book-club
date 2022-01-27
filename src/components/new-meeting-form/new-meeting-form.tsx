import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { getParticipants } from '../../store/selectors';

function NewMeetingForm(): JSX.Element {
  const [title, setTitile] = useState('');
  const [author, setAuthor] = useState('');
  const [choosingParticipant, setChoosingParticipant] = useState('1')
  const [date, setDate] = useState('')

  const participants = useSelector(getParticipants)

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(title, author, choosingParticipant, date)
    setTitile('')
    setAuthor('')
    setChoosingParticipant('1')
    setDate('')
  }

  return (
    <form onSubmit={handleSubmit} id="meeting-form" className="meeting-form" action="">
      <section className="form-block">
        <h3 className='form-block__title'>Next Book:</h3>
        <label className="form-block__label" htmlFor="reading-book-title">Title: </label>
        <input onChange={(e) => { setTitile(e.target.value) }} value={title} id="reading-book-title" type="text" />
        <label className="form-block__label" htmlFor="reading-book-author">Author: </label>
        <input onChange={(e) => { setAuthor(e.target.value) }} value={author} id="reading-book-author" type="text" />
      </section>

      <section className="form-block">
        <h3 className="form-block__title">Who choose:</h3>
        <select onChange={(e) => { setChoosingParticipant(e.target.value) }} value={choosingParticipant} name="participants" id="participants">
          {
            participants.map(participant => {
              return (
                <option value={participant.id} key={participant.id}>{`${participant.firstName} ${participant.lastName}`}</option>
              )
            })
          }
        </select>
      </section>
      <section className="form-block">
        <h3 className="form-block__title">Meeting Date:</h3>
        <label className="form-block__label" htmlFor="next-date">Choose date: </label>
        <input onChange={(e) => { setDate(e.target.value) }} value={date} type="date" id="next-date" name="meeting date" />
      </section>
      <button className="btn" type="submit">Submit</button>
    </form>
  )
}

export default NewMeetingForm;