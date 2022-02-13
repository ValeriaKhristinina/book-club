import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewParticipantAsync } from "../../store/participants";

function NewParticipantForm(): JSX.Element {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [joinDate, setJoinDate] = useState('')

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {

    evt.preventDefault();
    dispatch(createNewParticipantAsync({
      firstName: firstName,
      lastName: lastName,
      joinDate: joinDate,
    }))

    setFirstName('')
    setLastName('')
    setJoinDate('')
  }

  return (
    <form onSubmit={handleSubmit} action="" className="participant-form">
      <section className="form-block">
        <h3 className='form-block__title'>New Participant:</h3>
        <div className="div">
          <label className="form-block__label" htmlFor="participant__first-name">First name:</label>
          <input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} id="participant__first-name" type="text" />
        </div>
        <div className="">
          <label className="form-block__label" htmlFor="participant__last-name">Last name: </label>
          <input onChange={(e) => { setLastName(e.target.value) }} value={lastName} id="participant__last-name" type="text" />
        </div>
      </section>
      <section className="form-block">
        <h3 className="form-block__title">Join date:</h3>
        <label className="form-block__label" htmlFor="form-block__join-date">Date:</label>
        <input onChange={(e) => { setJoinDate(e.target.value) }} value={joinDate} id="form-block__join-date" type="date" />
      </section>

      <button className="btn" type="submit">Submit</button>
    </form>
  )
}

export default NewParticipantForm;