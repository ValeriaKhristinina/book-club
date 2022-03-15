import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './member-page.scss';
import Page from '../page/page';
import { getMemberByIdAsync } from '../../store/members';
import { formatDate } from '../../utils/utils';
import { getAllMemberChoosedBook, getAllVisitedMeetings, getSingleMember } from '../../store/selectors';

function MemberPage(): JSX.Element {
  const params = useParams();
  const memberId = params.id

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMemberByIdAsync(Number(memberId)))
  }, [dispatch, memberId]);

  const member = useSelector(getSingleMember)
  const choosedBooks = useSelector(getAllMemberChoosedBook)

  const visiredMeetings = useSelector(getAllVisitedMeetings(Number(memberId)))

  if (!member) {
    return <div>No person</div>
  }

  const joinDate = formatDate(member.joinDate);

  return (
    <Page>
      <section className="member-page container">
        <section className="member">
          <section className="member__avatar"></section>
          <h2 className="member__name">{member.firstName} {member.lastName}</h2>
          <p className="member__join">Join date: {joinDate}</p>
          <p className="member__visited-count">Visited meetings: {visiredMeetings.length}</p>
          <p className="member__chose-book">Chose this books:</p>
          <section className="member__books">
            {choosedBooks.map((book) => (
              <section className="member__book" key={book.id}>
                <div className="member__book-avatar">
                  {book.cover && (
                    <img src={book.cover.url} alt="" />
                  )}
                </div>
                <div className="member__book-title">{book.title}</div>
                <div className="member__book-author">{book.author}</div>
              </section>
            ))}
          </section>
        </section>
      </section>
    </Page>
  )
}

export default MemberPage;