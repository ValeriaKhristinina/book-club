import './card.scss';
import CardWrapper from '../card-wrapper/card-wrapper';
import { calculateAverageRating, checkProgressColor, formatDate, getRandomElement, visitingProgress } from '../../utils/utils';
import { AppRoute, COLORS, ImageUrl, EMOJI, RatingName } from '../../const';
import { MeetingAllInfo } from '../../types/meeting';
import Rating from '../rating/rating';
import { getJoinedMembersByDate } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

type CardProps = {
  meeting: MeetingAllInfo;
}

function Card({ meeting }: CardProps): JSX.Element {
  const countJoinedMembersByDate = useSelector(getJoinedMembersByDate(meeting.date))

  const votingPersons = meeting.participants.filter((person) => person.rating != null)
  const visitingPersons = meeting.participants.filter((person) => person.isVisited)
  const progressPercentage = visitingProgress(visitingPersons.length, countJoinedMembersByDate.length)
  const averageRating = calculateAverageRating(meeting)
  const coverIrl = meeting.cover ? meeting.cover.url : ImageUrl.DefaultBookCover
  return (
    <CardWrapper additionalClass="card-item">
      <section className='card'>
        <section className="card-deco card__container">
          <div
            style={{ backgroundColor: `${getRandomElement(COLORS)}` }}
            className="card-deco__emoji"
          >
            {getRandomElement(EMOJI)}
          </div>
          <div className="card-deco__cover">
            <img src={coverIrl} alt="book_cover" />
          </div>
        </section>
        <section className="card-info card__container">
          <section className="card-info__rating rating">
            <div className="rating__wrapper">
              <Rating name={RatingName.ReadOnly} averageValue={averageRating} />
              <section className="rating__average">({!Number.isNaN(averageRating) ? averageRating : '0'})</section>
            </div>

            <section className="rating__rated">
              <span className="rating__rated--yellow">{votingPersons.length}</span>/{countJoinedMembersByDate.length}
            </section>
          </section>
          <Link to={`/meeting/${meeting.id}`} className="card-info__title">
            {meeting.title} by {meeting.author}
          </Link>

          <div className="card-info--wrapper">
            <section className="card-info__chosenby">
              <Link to={`${AppRoute.Root}member/${meeting.chosenById}`}>{meeting.chosenByUser?.firstName}</Link>
            </section>
            <section className="card-info__time">{formatDate(meeting.date)}</section>
          </div>

          <section className="card-info__progress-line">
            <div className="progress-line">
              <div
                style={{ width: `${progressPercentage}%`, backgroundColor: `${checkProgressColor(progressPercentage)}` }}
                className="progress-line__progress"
              ></div>
            </div>

            <section className="visiting">
              <section className="visiting__info">
                <span className="visiting__info-text">
                  <span style={{ color: `${checkProgressColor(progressPercentage)}` }} className="visiting__info--yellow">{visitingPersons.length}</span>/{countJoinedMembersByDate.length}
                </span>
              </section>
              <section className="visiting__info-text visiting__percentage">
                <span style={{ color: `${checkProgressColor(progressPercentage)}` }} className="visiting__info--yellow">{progressPercentage}%</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </CardWrapper>
  );
}

export default Card;
