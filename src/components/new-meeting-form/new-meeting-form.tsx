import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMeetingAsync } from "../../store/meetings";
import { getMembers } from '../../store/selectors';

function NewMeetingForm(): JSX.Element {
  const [title, setTitile] = useState('');
  const [author, setAuthor] = useState('');
  const members = useSelector(getMembers)
  const [choosingMember, setChoosingMember] = useState(members[0].id)
  const [date, setDate] = useState('')
  const dispatch = useDispatch();



  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(title, author, choosingMember, date)
    dispatch(createNewMeetingAsync({
      date: date,
      title: title,
      author: author,
      chosenById: Number(choosingMember),
      isComplete: false,
      participants: [],
    }))

    setTitile('')
    setAuthor('')
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
        <select onChange={(e) => { setChoosingMember(+e.target.value) }} value={choosingMember} name="members" id="members">
          {
            members.map(member => {
              return (
                <option value={member.id} key={member.id}>{`${member.firstName} ${member.lastName}`}</option>
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