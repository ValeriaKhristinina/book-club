function NewParticipantForm(): JSX.Element {
  return (
    <form action="" className="participant-form">
      <section className="form-block">
        <h3 className='form-block__title'>New Participant:</h3>
        <div className="div">
          <label className="form-block__label" htmlFor="participant__first-name">First name:</label>
          <input id="participant__first-name" type="text" />
        </div>
        <div className="">
          <label className="form-block__label" htmlFor="participant__last-name">Last name: </label>
          <input id="participant__last-name" type="text" />
        </div>
      </section>
      <section className="form-block">
        <h3 className="form-block__title">Join date:</h3>
        <label className="form-block__label" htmlFor="form-block__join-date">Date:</label>
        <input id="form-block__join-date" type="date" />
      </section>

      <button className="btn" type="submit">Submit</button>
    </form>
  )
}

export default NewParticipantForm;