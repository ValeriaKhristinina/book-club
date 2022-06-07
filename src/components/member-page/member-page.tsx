import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import './member-page.scss';
import Page from '../page/page';
import Rating from '../rating/rating';
import { getMemberByIdAsync } from '../../store/members';
import { checkBookCover, formatDate, scrollToTop } from '../../utils/utils';
import { getAllMemberChoosedBook, getAllVisitedMeetings, getRatedBookByMember, getSingleMember } from '../../store/selectors';
import CardWrapper from '../card-wrapper/card-wrapper';
import { ImageUrl, RatingName } from '../../const';

function MemberPage(): JSX.Element {
  scrollToTop();
  const params = useParams();
  const memberId = params.id

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMemberByIdAsync(Number(memberId)))
  }, [dispatch, memberId]);

  const member = useSelector(getSingleMember)
  const choosedBooks = useSelector(getAllMemberChoosedBook)
  const visiredMeetings = useSelector(getAllVisitedMeetings(Number(memberId)))

  const ratedBooks = useSelector(getRatedBookByMember)
  ratedBooks.reverse()

  if (!member) {
    return <div>No person</div>
  }

  const joinDate = formatDate(member.joinDate);

  return (
    <Page>
      <section className="member-page container">
        <CardWrapper additionalClass="member">
          <>
            <section className="member__avatar">
              <img src={ImageUrl.MemberAvatar} alt="" />
            </section>
            <div>

              <div>
                <h2 className="member__name title">{member.firstName} {member.lastName}</h2>
                <p className="member__subtitle">Join date: {joinDate}</p>
                <p className="member__subtitle">Visited meetings: {visiredMeetings.length}</p>
                <p className="member__subtitle">Rated books: {ratedBooks.length}</p>
              </div>
              <img src={ImageUrl.CatOnBooks} width={"200px"} alt="" />
            </div>
          </>
        </CardWrapper>

        <h1 className="title">Chose this books:</h1>
        <CardWrapper additionalClass='member-books'>
          <section className="member__books">
            {choosedBooks.map((book) => (
              <section className="member__book" key={book.id}>
                <div className="member__book-avatar">
                  <img src={checkBookCover(book)} alt="" />
                </div>
                <Link to={`/meeting/${book.id}`} className="member__book-title">{book.title}</Link>
                <div className="member__book-author">{book.author}</div>
              </section>
            ))}
          </section>
        </CardWrapper>

        <h1 className="title">Rated this books:</h1>

        <CardWrapper>
          <section>
            {ratedBooks.reverse().map(book => (
              <section className='rated-books' key={book.id}>
                <h2 className="subtitle">{book.title} by {book.author}</h2>
                <Rating name={RatingName.ReadOnly} averageValue={book.participants.find(participant => participant.id === member.id)?.rating} />
              </section>
            ))}
          </section>
        </CardWrapper>
      </section>
    </Page>
  )
}

export default MemberPage;
