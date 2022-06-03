import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMeetingByIdAsync } from "../../store/meetings";
import { getSingleMeeting } from "../../store/selectors";
import { scrollToTop } from "../../utils/utils";
import Page from "../page/page";

function MeetingPage() {
  scrollToTop();
  const params = useParams();
  const meetingId = params.id

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeetingByIdAsync(Number(meetingId)))
  }, [dispatch, meetingId]);

  const meeting = useSelector(getSingleMeeting)

  return (
    <Page>
      <section className="meeting-page container">
        <h1>{meeting?.title}</h1>
        <button onClick={() => console.log(meeting)}>Click</button>
      </section>
    </Page>
  )
}

export default MeetingPage;