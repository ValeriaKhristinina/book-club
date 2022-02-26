import './card.scss';
import { calculateAverageRating, checkProgressColor, formatDate, getRandomElement, visitingProgress, widthRating } from '../../utils/utils';
import { COLORS, EMOJI, RatingName } from '../../const';
import { MeetingAllInfo } from '../../types/meeting';
import Rating from '../rating/rating';
import { getJoinedParticipantsByDate } from '../../store/selectors';
import { useSelector } from 'react-redux';

type CardProps = {
  meeting: MeetingAllInfo;
  isNext: boolean;
}

function Card({ meeting, isNext }: CardProps): JSX.Element {
  const countJoinedParticipantsByDate = useSelector(getJoinedParticipantsByDate(meeting.date))

  const votingPersons = meeting.persons.filter((person) => person.rating != null)
  const visitingPersons = meeting.persons.filter((person) => person.isVisited)
  const progressPercentage = visitingProgress(visitingPersons.length, countJoinedParticipantsByDate.length)

  return (
    <section className="card">
      {isNext && (
        <section className='card__next'>
          <span>Next</span>
        </section>

      )}
      <section className="card-deco card__container">
        <div
          style={{ backgroundColor: `${getRandomElement(COLORS)}` }}
          className="card-deco__emoji"
        >
          {getRandomElement(EMOJI)}
        </div>
        <div className="card-deco__cover">
          <img src={meeting.cover.url} alt="cover" />
        </div>
      </section>
      <section className="card-info card__container">
        <section className="card-info__rating rating">
          <div className="rating__wrapper">
            <Rating name={RatingName.ReadOnly} averageValue={widthRating(calculateAverageRating(meeting))} />
            <section className="rating__average">({!isNaN(calculateAverageRating(meeting)) ? calculateAverageRating(meeting) : '0'})</section>
          </div>

          <section className="rating__rated">
            <span className="rating__rated--yellow">{votingPersons.length}</span>/{countJoinedParticipantsByDate.length}
          </section>
        </section>
        <h1 className="card-info__title">
          {meeting.title} by {meeting.author}
        </h1>

        <div className="card-info--wrapper">
          <section className="card-info__chosenby">{meeting.chosenByUser?.firstName}</section>
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
                <span style={{ color: `${checkProgressColor(progressPercentage)}` }} className="visiting__info--yellow">{visitingPersons.length}</span>/{countJoinedParticipantsByDate.length}
              </span>
            </section>
            <section className="visiting__info-text visiting__percentage">
              <span style={{ color: `${checkProgressColor(progressPercentage)}` }} className="visiting__info--yellow">{progressPercentage}%</span>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Card;
