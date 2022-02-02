import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './participant-page.css';
import { getParticipantByIdAsync } from '../../store/participants';
import { formatDate } from '../../utils/utils';
import { getAllParticipantChoosedBook, getSingleParticipant } from '../../store/selectors';

function ParticipantPage(): JSX.Element {
  const params = useParams();
  const participantId = params.id

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParticipantByIdAsync(Number(participantId)))
  }, [dispatch, participantId]);

  const participant = useSelector(getSingleParticipant)
  const choosedBooks = useSelector(getAllParticipantChoosedBook)

  if (!participant) {
    return <div>No person</div>
  }

  const joinDate = formatDate(participant.joinDate);

  return (
    <section className="participant-page container">
      <section className="participant">
        <section className="participant__avatar"></section>
        <h2 className="participant__name">{participant.firstName} {participant.lastName}</h2>
        <p className="participant__join">Join date: {joinDate}</p>
        <p className="participant__visited-count">Visited meetings: COUNT</p>
        <p className="participant__chose-book">Chose this books:</p>
        <section className="participant__books">
          {choosedBooks.map((book) => (
            <section className="participant__book" key={book.id}>
              <div className="participant__book-avatar"></div>
              <div className="participant__book-title">{book.title}</div>
              <div className="participant__book-author">{book.author}</div>
            </section>
          ))}
        </section>
      </section>
    </section>
  )
}

export default ParticipantPage;