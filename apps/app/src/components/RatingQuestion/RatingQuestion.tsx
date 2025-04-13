import c from './RatingQuestion.module.scss';
import StarRating from '../StarRating';

interface RatingQuestionProps {
  title: string;
  text: string;
  onRatingChange?: (rating: number) => void;
}

export const RatingQuestion = ({
  title,
  text,
  onRatingChange,
}: RatingQuestionProps) => {
  return (
    <div className={c.ratingQuestion}>
      <h3>{title}</h3>
      <p className={c.ratingQuestionText}>{text}</p>
      <StarRating
        style={{ marginTop: '16px' }}
        onRatingChange={onRatingChange}
      />
    </div>
  );
};
