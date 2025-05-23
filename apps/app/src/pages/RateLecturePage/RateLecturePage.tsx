import c from './RateLecturePage.module.scss';
import closeIcon from '../../assets/icons/close-icon.svg';
import Button from '../../components/Button';
import { Link, useParams } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
import RatingQuestion from '../../components/RatingQuestion';
import { useEffect, useState } from 'react';
import LectureRatingCard from '../../components/LectureRatingCard/LectureRatingCard';
import { useNavigate } from 'react-router-dom';
import { useRatingQuestionsGetAll } from '@/api/rating/useRatingQuestionsGetAll';
import {
  EventType,
  RatingModifyDto,
  RatingQuestionType,
} from '@ddays-app/types';
import { useEventGetById } from '@/api/event/useEventGetById';
import toast from 'react-hot-toast';
import { useGetUserRatings } from '@/api/rating/useGetUserRatings';
import { useRatingAddMultiple } from '@/api/rating/useRatingAddMultiple';

export const RateLecturePage = () => {
  const navigate = useNavigate();
  const { eventId: evendIdString } = useParams();
  const eventId = Number(evendIdString);
  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
  } = useEventGetById(eventId);
  const { data: userRatings } = useGetUserRatings();

  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const { mutate: addRatings } = useRatingAddMultiple();

  const allQuestionsAnswered = Object.values(answers).every(
    (answer) => answer !== null,
  );

  const { data: questions } = useRatingQuestionsGetAll();

  useEffect(() => {
    if (!questions) return;

    const initialAnswers: Record<number, number | null> = {};
    questions
      .filter((q) => q.type === RatingQuestionType.EVENT)
      .forEach((question) => {
        initialAnswers[question.id] = null;
      });
    setAnswers(initialAnswers);
  }, [questions]);

  const handleAnswerChange = (key: number, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: value,
    }));
  };

  useEffect(() => {
    let toastId: React.ReactText | null = null;

    if (isEventLoading) {
      toastId = toast.loading('Učitavanje događaja...', {
        position: 'top-center',
      });
    } else {
      if (toastId !== null) {
        toast.dismiss(toastId);
      }

      if (isEventError) {
        toast.error('Greška prilikom učitavanja događaja.', {
          position: 'top-center',
        });
        navigate(RouteNames.HOME);
      }

      if (event?.type === null || event?.type === undefined) {
        toast('Greška prilikom učitavanja vrste događaja.', {
          icon: '⚠️',
          position: 'top-center',
        });
        navigate(RouteNames.HOME);
        return;
      }

      if (event.type === EventType.FLY_TALK || event.type === EventType.OTHER) {
        toast('Ova vrsta događaja nije dostupna za ocjenjivanje', {
          icon: '⚠️',
          position: 'top-center',
        });
        navigate(RouteNames.HOME);
        return;
      }

      if (new Date(event?.startsAt) > new Date()) {
        toast('Događaj još nije započeo', {
          icon: '⚠️',
          position: 'top-center',
        });
        navigate(RouteNames.HOME);
        return;
      }

      if (new Date(event?.endsAt).getTime() + 15 * 60 * 1000 < Date.now()) {
        toast('Događaj je već završio', {
          icon: '⚠️',
          position: 'top-center',
        });
        navigate(RouteNames.HOME);
        return;
      }

      if (userRatings?.some((rating) => rating.eventId === event?.id)) {
        toast('Ovaj je događaj već ocijenjen', {
          icon: '⚠️',
          position: 'top-center',
        });
        navigate(RouteNames.HOME);
        return;
      }
    }

    return () => {
      if (toastId !== null) {
        toast.dismiss(toastId);
      }
    };
  }, [isEventError, isEventLoading, navigate, event?.id, userRatings]);

  function handleButtonClick() {
    const questionIds = Object.keys(answers).map((id) => Number(id));

    const dtos: RatingModifyDto[] = questionIds
      .filter((id) => answers[id] !== null)
      .map((id) => ({
        eventId: event?.id,
        ratingQuestionId: id,
        value: answers[id]!,
        boothId: undefined,
        comment: undefined,
      }));

    addRatings(dtos);
  }

  if (isEventLoading) return null;

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
            name={event?.name || ''}
            theme={event?.theme || 'DEV'}
            type={event?.type || 'LECTURE'}
            speakers={event?.speakers?.map((speaker) => ({
              firstName: speaker.firstName,
              lastName: speaker.lastName,
              title: speaker.title,
              companyName: speaker.company?.name,
            }))}
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
