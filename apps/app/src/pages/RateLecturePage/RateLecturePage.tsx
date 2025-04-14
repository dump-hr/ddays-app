import c from './RateLecturePage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import RatingQuestion from '../../components/RatingQuestion';
import { useState } from 'react';
import LectureRatingCard from '../../components/LectureRatingCard/LectureRatingCard';

enum RatingType {
  THEME = 'generalImpression',
  PRESENTATION_SKILLS = 'standContent',
  RELEVANCE = 'exhibitors',
}

interface RatingAnswers {
  [RatingType.THEME]: number | null;
  [RatingType.PRESENTATION_SKILLS]: number | null;
  [RatingType.RELEVANCE]: number | null;
}

const RATING_QUESTIONS = [
  {
    type: RatingType.THEME,
    title: 'Poznavanje teme?',
    text: 'Imaš li predznanje o ovoj temi?',
  },
  {
    type: RatingType.PRESENTATION_SKILLS,
    title: 'prezentacijske vještine',
    text: 'Ocijeni prezentacijske vještine predavača.',
  },
  {
    type: RatingType.RELEVANCE,
    title: 'Relevantnost',
    text: 'Koliko će ti ovo predavanje koristiti u budućnosti?',
  },
];

export const RateLecturePage = () => {
  const [answers, setAnswers] = useState<RatingAnswers>({
    [RatingType.THEME]: null,
    [RatingType.PRESENTATION_SKILLS]: null,
    [RatingType.RELEVANCE]: null,
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
            {RATING_QUESTIONS.map((question) => (
              <RatingQuestion
                key={question.type}
                title={question.title}
                text={question.text}
                onRatingChange={(value) =>
                  handleAnswerChange(question.type, value)
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
