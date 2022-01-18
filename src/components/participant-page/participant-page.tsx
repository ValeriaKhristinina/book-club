import './participant-page.css';

function ParticipantPage(): JSX.Element {
  return (
    <section className="participant-page container">
      <section className="participant">
        <section className="participant__avatar"></section>
        <h2 className="participant__name">FirstName LastName</h2>
        <p className="participant__join">Join date: DATE</p>
        <p className="participant__visited-count">Visited meetings: COUNT</p>
        <p className="participant__chose-book">Chose this books:</p>
        <section className="participant__books">
          <section className="participant__book">
            <div className="participant__book-avatar"></div>
            <div className="participant__book-title">TITLE</div>
            <div className="participant__book-author">AUTHOR</div>
          </section>
          <section className="participant__book">
            <div className="participant__book-avatar"></div>
            <div className="participant__book-title">TITLE</div>
            <div className="participant__book-author">AUTHOR</div>
          </section>
          <section className="participant__book">
            <div className="participant__book-avatar"></div>
            <div className="participant__book-title">TITLE</div>
            <div className="participant__book-author">AUTHOR</div>
          </section>
          <section className="participant__book">
            <div className="participant__book-avatar"></div>
            <div className="participant__book-title">TITLE</div>
            <div className="participant__book-author">AUTHOR</div>
          </section>
        </section>
      </section>
    </section>
  )
}

export default ParticipantPage;