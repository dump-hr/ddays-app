import c from './RatingQuestion.module.scss';
import StarRating from '../StarRating';

interface RatingQuestionProps {
  title: string;
  text: string;
}

export const RatingQuestion = ({ title, text }: RatingQuestionProps) => {
  return (
    <div className={c.ratingQuestion}>
      <h3>{title}</h3>
      <p className={c.ratingQuestionText}>{text}</p>
      <StarRating style={{ marginTop: '16px' }} />
    </div>
  );
};
