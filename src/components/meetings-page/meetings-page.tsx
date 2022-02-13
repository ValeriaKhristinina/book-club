import { useDispatch, useSelector } from "react-redux";
import './meetings-page.css';
import { getMeetingsWithAllInfo } from '../../store/selectors';
import { formatDate } from "../../utils/utils";
import { deleteMeetingAsync } from "../../store/meetings";
import { Fragment, useState } from "react";
import Page from "../page/page";

function MeetingsPage(): JSX.Element {
  const [isActiveModal, setActiveModal] = useState(false)
  const [meetingID, setMeetingID] = useState(0)
  const meetingsUsual = useSelector(getMeetingsWithAllInfo)
  const meetings = [...meetingsUsual].reverse();
  const dispatch = useDispatch();

  const mainBody = document.querySelector('body')
  const mainHtml = document.querySelector('html')

  const manageScroll = (styleProperty: string) => {
    if (mainBody) mainBody.style.overflow = styleProperty
    if (mainHtml) mainHtml.style.overflow = styleProperty
  }

  if (isActiveModal) manageScroll('hidden')

  const handleDelete = (meetingID: number) => {
    dispatch(deleteMeetingAsync(meetingID))
    setActiveModal(false)
    manageScroll('visible')
  }

  const handleCloseModal = () => {
    setActiveModal(false)
    manageScroll('visible')
  }


  return (
    <Page>
      <section className="meetings-page container">
        {meetings.map((meeting) => (
          <Fragment key={meeting.id}>
            <section className="meeting">
              <div className="meeting__block">
                <h2 className="meeting__book-title">{meeting.title}</h2>
                <p className="meeting__book-author">{meeting.author}</p>
              </div>
              <div className="meeting__block">
                <div className="meeting__block-date">{formatDate(meeting.date)}</div>
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
                          <li key={person.id}>{person.firstName} {person.lastName}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className="meeting__block">
                <button onClick={() => { setMeetingID(meeting.id); setActiveModal(true); }} className="btn btn-delete" type="button">Delete Meeting</button>
              </div>
            </section>


          </Fragment>
        ))}

        {isActiveModal && (
          <>
            <div onClick={handleCloseModal} className="modal"></div>
            <section className="warning">
              <h1>Are you sure?</h1>
              <div className="warning__btn-container">
                <button onClick={() => { handleDelete(meetingID) }} className="btn">Yes</button>
                <button onClick={handleCloseModal} className="btn btn--red">No</button>
              </div>
            </section>
          </>
        )
        }

      </section>
    </Page>
  )
}

export default MeetingsPage;
