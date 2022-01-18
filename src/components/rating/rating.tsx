import { Fragment } from 'react';
import './rating.css';

function Rating(): JSX.Element {
  return (
    <div className="rate">
      {
        ['5', '4', '3', '2', '1'].map(ratingItem => {
          return (
            <Fragment key={ratingItem}>
              <input type="radio" id={`star${ratingItem}`} name="rate" value={ratingItem} />
              <label htmlFor={`star${ratingItem}`} className="rate__label" title="text">{ratingItem} stars</label>
            </Fragment>
          )
        })
      }
    </div>
  )
}

export default Rating;