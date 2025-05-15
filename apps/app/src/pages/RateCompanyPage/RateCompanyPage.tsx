import c from './RateCompanyPage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
//import HRCloudLogo from '../../assets/images/HRCloud.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import RatingQuestion from '../../components/RatingQuestion';
import { useEffect, useState } from 'react';
import { useRatingQuestionsGetAll } from '@/api/rating/useRatingQuestionsGetAll';
import { RatingModifyDto, RatingQuestionType } from '@ddays-app/types';
import { useRatingAddMultiple } from '@/api/rating/useRatingAddMultiple';
import { useCompanyGetById } from '@/api/company/getCompanyById';
import toast from 'react-hot-toast';

export const RateCompanyPage = () => {
  const navigate = useNavigate();
  const { companyId: companyIdString } = useParams();
  const companyId = Number(companyIdString);
  const {
    data: company,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
  } = useCompanyGetById(companyId);

  const { data: questions } = useRatingQuestionsGetAll();
  const { mutate: addRatings } = useRatingAddMultiple();
  const [answers, setAnswers] = useState<Record<number, number | null>>({});

  useEffect(() => {
    if (!questions) return;

    const initialAnswers: Record<number, number | null> = {};
    questions
      .filter((q) => q.type === RatingQuestionType.BOOTH)
      .forEach((question) => {
        initialAnswers[question.id] = null;
      });
    setAnswers(initialAnswers);
  }, [questions]);

  useEffect(() => {
    let toastId: React.ReactText | null = null;

    if (isCompanyLoading) {
      toastId = toast.loading('Učitavanje kompanije...', {
        position: 'top-center',
      });
    } else {
      if (toastId !== null) {
        toast.dismiss(toastId);
      }

      if (isCompanyError) {
        toast.error('Greška prilikom učitavanja kompanije.', {
          position: 'top-center',
        });
        navigate(RouteNames.HOME);
      }
    }

    return () => {
      if (toastId !== null) {
        toast.dismiss(toastId);
      }
    };
  }, [isCompanyLoading, isCompanyError, navigate]);

  if (!companyId) {
    return <div>ID kompanije nije dobrog formata.</div>;
  }

  const allQuestionsAnswered = Object.values(answers).every(
    (answer) => answer !== null,
  );

  const handleAnswerChange = (key: number, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value,
    }));
  };

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

  if (isCompanyLoading) return null;

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
            <img
              src={company?.logoImage}
              alt='Company logo'
              className={c.logo}
            />
            <p className={c.companyLocationAtConference}>{company?.booth}</p>
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
