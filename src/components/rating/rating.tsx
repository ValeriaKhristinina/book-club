import { widthRating } from '../../utils/utils';
import './rating.scss';

type RatingProps = {
  averageValue?: number;
  defaultValue?: number;
};

function Rating({
  averageValue,
  defaultValue
}: RatingProps): JSX.Element {

  return (
    <div className="rate">
        <div className="rating__stars">
          <div
            style={{
              width: `${widthRating(averageValue ? averageValue : 0)}%`
            }}
          ></div>
        </div>
    </div>
  );
}

export default Rating;
