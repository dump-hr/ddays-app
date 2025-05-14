import c from './RateLecturePage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import RatingQuestion from '../../components/RatingQuestion';
import { useState } from 'react';
import LectureRatingCard from '../../components/LectureRatingCard/LectureRatingCard';
import { useNavigate } from 'react-router-dom';
import PointModifierPopup from '@/components/PointModifierPopup';
import { useRatingQuestionsGetAll } from '@/api/rating/useRatingQuestionsGetAll';
import { RatingQuestionType } from '@ddays-app/types';

export const RateLecturePage = () => {
  const navigate = useNavigate();
  const [isPointModifierOpen, setIsPointModifierOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

  const allQuestionsAnswered = Object.values(answers).every(
    (answer) => answer !== null,
  );

  const handleAnswerChange = (key: number, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value,
    }));
  };

  const { data: questions } = useRatingQuestionsGetAll();

  return (
    <div>
      <div className={c.wrapper}>
        <div className={c.page}>
          <Link to={RouteNames.HOME}>
            <img src={closeIcon} alt='Close login' className={c.closeIcon} />
          </Link>
        </div>
        <div className={c.container}>
          <div className={c.titleContainer}>
            <h1 className={c.title}>Ocjeni predavanje</h1>
            <Link to={RouteNames.HOME}>
              <img src={closeIcon} alt='Close login' className={c.closeIcon} />
            </Link>
          </div>
          <LectureRatingCard
            id='lecture-card'
            className={c.customLectureCard}
            name='Od CV-a do tehničkog intervjua: Kako impresionirati potencijalnog poslodavca'
            theme='DEV'
            type='LECTURE'
            speakers={[
              {
                firstName: 'DAVOR',
                lastName: 'BRUKETA',
                title: 'FOUNDER & CREATIVE DIRECTOR',
                companyName: 'BRUKETA&ŽINIĆ',
              },
            ]}
          />
          <div className={c.ratingContainer}>
            {questions
              ?.filter((q) => q.type === RatingQuestionType.EVENT)
              .map((question) => (
                <RatingQuestion
                  key={question.id}
                  title={question.subtitle}
                  text={question.question}
                  onRatingChange={(value) =>
                    handleAnswerChange(question.id, value)
                  }
                />
              ))}
          </div>

          <div className={c.buttonContainer}>
            <Button
              variant='black'
              onClick={() => {
                setPoints(50);
                setIsPointModifierOpen(true);
              }}
              disabled={!allQuestionsAnswered}>
              Spremi
            </Button>
          </div>

          <PointModifierPopup
            isOpen={isPointModifierOpen}
            points={points}
            closePopup={() => {
              setIsPointModifierOpen(false);
              navigate('/app');
            }}
          />
        </div>
      </div>
    </div>
  );
};
