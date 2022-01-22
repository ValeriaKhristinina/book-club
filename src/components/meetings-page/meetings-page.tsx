import { Fragment } from "react";
import { useSelector } from "react-redux";
import './meetings-page.css';
import { getMeetingsWithAllInfo } from '../../store/selectors';
import { formatDate } from "../../utils/utils";

function MeetingsPage(): JSX.Element {
  const meetingsUsual = useSelector(getMeetingsWithAllInfo)
  const meetings = [...meetingsUsual].reverse();


  return (
    <section className="meetings-page container">
      {meetings.map((meeting) => (
        <Fragment key={meeting.id}>
          <section className="meeting">
            <div className="meeting__block">
              <h2 className="meeting__book-title">{meeting.title}</h2>
              <p className="meeting__book-author">{meeting.author}</p>
            </div>
            <div className="meeting__block">
              <div className="meeting__block-date">{formatDate(meeting.chosenById.toString())}</div>
            </div>
            <div className="meeting__block">
              <div className="meeting__block-chose-by">{meeting.chosenByUser?.firstName} {meeting.chosenByUser?.lastName}</div>
            </div>
            <div className="meeting__block">
              <div className="meeting__blockparticipants">
                <h2>Participants</h2>
                <ul>
                  {
                    meeting.persons.map((person) => {
                      return (
                        <li>{person.firstName} {person.lastName}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </section>
        </Fragment>
      ))}

    </section>
  )
}

export default MeetingsPage;