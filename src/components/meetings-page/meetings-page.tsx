import { useDispatch, useSelector } from "react-redux";
import './meetings-page.scss';
import { getAuthorizationStatus, getCompletedMeetingsWithAllInfo } from '../../store/selectors';
import { deleteMeetingAsync } from "../../store/meetings";
import { Fragment, useState } from "react";
import Page from "../page/page";
import Card from '../card/card';
import { AuthorizationStatus } from "../../const";
import { scrollToTop } from "../../utils/utils";

function MeetingsPage(): JSX.Element {

  scrollToTop()

  const dispatch = useDispatch();

  const [isActiveModal, setActiveModal] = useState(false)
  const [meetingID, setMeetingID] = useState(0)

  const meetingsUsual = useSelector(getCompletedMeetingsWithAllInfo)
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const meetings = [...meetingsUsual].reverse();

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
      <section className="meetings-page cards container">
        {meetings.map((meeting) => (
          <Fragment key={meeting.id} >
            <Card meeting={meeting} />

            {authorizationStatus === AuthorizationStatus.Auth && (
              <div className="meeting__block">
                <button onClick={() => { setMeetingID(meeting.id); setActiveModal(true); }} className="btn btn-delete" type="button">Delete Meeting</button>
              </div>
            )}
          </Fragment>
        ))
        }

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
    </Page >
  )
}

export default MeetingsPage;
