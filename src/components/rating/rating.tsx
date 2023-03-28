import { Fragment, useState } from 'react';
import { RatingName } from '../../const';
import { widthRating } from '../../utils/utils';
import './rating.scss';

type RatingProps = {
  name: string;
  averageValue?: number;
  defaultValue?: number;
};

function Rating({
  name,
  averageValue,
  defaultValue
}: RatingProps): JSX.Element {
  const [rating, setRating] = useState('0');

  return (
    <div className="rate">
      {name === RatingName.Controlled &&
        ['5', '4', '3', '2', '1'].map((ratingItem) => {
          return (
            <Fragment key={ratingItem}>
              <input
                onChange={() => {
                  setRating(ratingItem);
                }}
                checked={
                  rating === ratingItem || defaultValue === Number(ratingItem)
                }
                type="radio"
                id={`star${ratingItem}`}
                name="rate"
                value={defaultValue || ratingItem}
              />
              <label
                htmlFor={`star${ratingItem}`}
                className="rate__label"
                title="text"
              >
                {ratingItem} stars
              </label>
            </Fragment>
          );
        })}

      {name === RatingName.ReadOnly && (
        <div className="rating__stars">
          <div
            style={{
              width: `${widthRating(averageValue ? averageValue : 0)}%`
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Rating;
