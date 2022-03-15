import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewMemberAsync } from "../../store/members";

function NewMemberForm(): JSX.Element {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [joinDate, setJoinDate] = useState('')

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {

    evt.preventDefault();
    dispatch(createNewMemberAsync({
      firstName: firstName,
      lastName: lastName,
      joinDate: joinDate,
      exitDate: null,
    }))

    setFirstName('')
    setLastName('')
    setJoinDate('')
  }

  return (
    <form onSubmit={handleSubmit} action="" className="member-form">
      <section className="form-block">
        <h3 className='form-block__title'>New member:</h3>
        <div className="div">
          <label className="form-block__label" htmlFor="member__first-name">First name:</label>
          <input onChange={(e) => { setFirstName(e.target.value) }} value={firstName} id="member__first-name" type="text" />
        </div>
        <div className="">
          <label className="form-block__label" htmlFor="member__last-name">Last name: </label>
          <input onChange={(e) => { setLastName(e.target.value) }} value={lastName} id="member__last-name" type="text" />
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

export default NewMemberForm;