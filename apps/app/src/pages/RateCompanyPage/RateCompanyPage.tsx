import c from './RateCompanyPage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import HRCloudLogo from '../../assets/images/HRCloud.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import RatingQuestion from '../../components/RatingQuestion';
import { useState } from 'react';
import { useRatingQuestionsGetAll } from '@/api/rating/useRatingQuestionsGetAll';
import { RatingModifyDto, RatingQuestionType } from '@ddays-app/types';
import { useRatingAddMultiple } from '@/api/rating/useRatingAddMultiple';

export const RateCompanyPage = () => {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});

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
  const { mutate: addRatings } = useRatingAddMultiple();

  function handleButtonClick() {
    const questionIds = Object.keys(answers).map((id) => Number(id));

    const dtos: RatingModifyDto[] = questionIds
      .filter((id) => answers[id] !== null)
      .map((id) => ({
        boothId: 1,
        ratingQuestionId: id,
        value: answers[id]!, // ! jer smo filtrirali nullove
        eventId: undefined,
        comment: undefined,
      }));

    addRatings(dtos);
  }

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
            <h1 className={c.title}>Ocjeni sponzorski štand</h1>
            <Link to={RouteNames.HOME}>
              <img src={closeIcon} alt='Close login' className={c.closeIcon} />
            </Link>
          </div>
          <div className={c.companyDetails}>
            <img src={HRCloudLogo} alt='Company logo' className={c.logo} />
            <p className={c.companyLocationAtConference}>Z4</p>
          </div>
          <div className={c.breakline}></div>
          <div className={c.ratingContainer}>
            {questions
              ?.filter((question) => question.type === RatingQuestionType.BOOTH)
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
              onClick={handleButtonClick}
              disabled={!allQuestionsAnswered}>
              Spremi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
