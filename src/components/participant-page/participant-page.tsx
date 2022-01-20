import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getParticipantByIdAsync } from '../../store/participants';
import { RootState } from '../../store/store';
import './participant-page.css';

function ParticipantPage(): JSX.Element {
  const params = useParams();
  const participantId = params.id

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParticipantByIdAsync(Number(participantId)))
  }, [dispatch, participantId]);

  const participant = useSelector((state: RootState) => state.participants.singleParticipant)

  if (!participant) {
    return <div>No person</div>
  }

  const joinDate = moment(participant.joinDate).format("D MMMM YYYY");

  return (
    <section className="participant-page container">
      <section className="participant">
        <section className="participant__avatar"></section>
        <h2 className="participant__name">{participant.firstName} {participant.lastName}</h2>
        <p className="participant__join">Join date: {joinDate}</p>
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