import c from './RateCompanyPage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import HRCloudLogo from '../../assets/images/HRCloud.svg';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import RatingQuestion from '../../components/RatingQuestion';
import { useState } from 'react';
import { useRatingQuestionsGetAll } from '@/api/rating/useRatingQuestionsGetAll';

enum RatingType {
  GENERAL_IMPRESSION = 'generalImpression',
  STAND_CONTENT = 'standContent',
  EXHIBITORS = 'exhibitors',
}

interface RatingAnswers {
  [RatingType.GENERAL_IMPRESSION]: number | null;
  [RatingType.STAND_CONTENT]: number | null;
  [RatingType.EXHIBITORS]: number | null;
}

export const RateCompanyPage = () => {
  const [answers, setAnswers] = useState<RatingAnswers>({
    [RatingType.GENERAL_IMPRESSION]: null,
    [RatingType.STAND_CONTENT]: null,
    [RatingType.EXHIBITORS]: null,
  });

  const allQuestionsAnswered = Object.values(answers).every(
    (answer) => answer !== null,
  );

  const handleAnswerChange = (type: RatingType, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [type]: value,
    }));
  };

  const { data: questions } = useRatingQuestionsGetAll();

  return (
    <div>
      <button onClick={() => console.log(questions)}>log questions</button>
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
            {questions?.map((question) => (
              <RatingQuestion
                key={question.id}
                title={question.question}
                text={question.type}
                onRatingChange={(value) =>
                  handleAnswerChange(question.type as RatingType, value)
                }
              />
            ))}
          </div>

          <div className={c.buttonContainer}>
            <Button
              variant='black'
              onClick={() => console.log('Button clicked')}
              disabled={!allQuestionsAnswered}>
              Spremi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
