import { useState } from 'react';
import styles from './StarRating.module.scss';
import RatingStar from '../../assets/icons/star-rating-1-full.svg';
import EmptyStar from '../../assets/icons/star-rating-1-empty.svg';

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(star)}
          className={styles.starButton}>
          {star <= (hover || rating) ? (
            <img src={RatingStar} className={styles.star} alt='filled star' />
          ) : (
            <img src={EmptyStar} className={styles.star} alt='empty star' />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
