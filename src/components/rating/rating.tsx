import { Fragment, useState } from 'react';
import { RatingName } from '../../const';
import './rating.scss';

type RatingProps = {
  name: string,
}

function Rating({ name }: RatingProps): JSX.Element {
  const [rating, setRating] = useState('0');

  return (
    <div className="rate">
      {name === RatingName.Controlled &&
        ['5', '4', '3', '2', '1'].map(ratingItem => {
          return (
            <Fragment key={ratingItem}>
              <input onChange={(evt) => { setRating(ratingItem); }} checked={rating === ratingItem} type="radio" id={`star${ratingItem}`} name="rate" value={ratingItem} />
              <label htmlFor={`star${ratingItem}`} className="rate__label" title="text">{ratingItem} stars</label>
            </Fragment>
          )
        })
      }

      {name === RatingName.ReadOnly && (
        <div className="reviews__stars rating__stars">
          <span style={{ width: '50%' }}></span>
        </div>
      )
      }
    </div>
  )
}

export default Rating;