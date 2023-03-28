import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './meeting-page.scss';
import { getMeetingByIdAsync } from '../../store/meetings';
import {
  getAllMembers,
  getAuthorizationStatus,
  getSingleMeeting
} from '../../store/selectors';
import { scrollToTop } from '../../utils/utils';
import Page from '../page/page';
import { AuthorizationStatus } from '../../const';
import MeetingEditForm from '../meeting-edit-form/meeting-edit-form';

function MeetingPage() {
  scrollToTop();
  const params = useParams();
  const meetingId = params.id;
  const members = useSelector(getAllMembers);

  const auth = useSelector(getAuthorizationStatus);
  const meeting = useSelector(getSingleMeeting);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeetingByIdAsync(Number(meetingId)));
  }, [dispatch, meetingId]);

  if (!meeting) {
    return <div> No meeting</div>;
  }

  return (
    <Page>
      <section className="meeting-page container">
        {auth !== AuthorizationStatus.Auth ? (
          <Fragment>
            <h1>
              {meeting?.title} by {meeting.author}
            </h1>
            <section>
              {meeting?.participants.map((participant) => {
                return (
                  <>
                    <div>
                      {
                        members.find((member) => member.id === participant.id)
                          ?.firstName
                      }{' '}
                      {
                        members.find((member) => member.id === participant.id)
                          ?.lastName
                      }
                    </div>
                  </>
                );
              })}
            </section>
          </Fragment>
        ) : (
          <MeetingEditForm meeting={meeting} />
        )}
      </section>
    </Page>
  );
}

export default MeetingPage;
