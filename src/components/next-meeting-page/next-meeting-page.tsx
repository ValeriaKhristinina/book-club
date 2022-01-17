import './next-meeting-page.css';

function NextMeetingPage(): JSX.Element {
  return (
    <section className="next-meeting container">
      <section className="next-meeting-block">
        <h3 className="next-meeting-block__title">Next Book</h3>
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

    </section>
  )
}

export default NextMeetingPage;