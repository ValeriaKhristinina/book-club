import { Fragment, useState } from "react";

function Rating(): JSX.Element {
  const [rating, setRating] = useState("0");
  return (
    <div className="reviews__rating-form form__rating">
      {["5", "4", "3", "2", "1"].map((ratingItem) => (
        <Fragment key={ratingItem}>
          <input
            onChange={(evt) => {
              setRating(ratingItem);
            }}
            checked={rating === ratingItem}
            className=""
            name="rating"
            value={ratingItem}
            id={`${ratingItem}-stars`}
            type="radio"
          />
          <label
            htmlFor={`${ratingItem}-stars`}
            className=""
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  )
}

export default Rating;