import Button from '../Button';
import star from '../../assets/icons/star.svg';
import warning from '../../assets/images/warning.png';
import greenCheck from '../../assets/images/green-check.svg';
import redX from '../../assets/images/red-x.svg';
import { useNavigate } from 'react-router-dom';
import c from './FlyTalksGroup.module.scss';
import sadEmoji from '../../assets/images/sad-emoji.png';
import { useDeleteFlyTalkApplication } from '@/api/flyTalks/useDeleteFlyTalkApplication';

interface FlyTalksGroupProps {
  group: {
    id: number;
    start: string;
    end: string;
    participantsNumber: number;
    companies: {
      id: number;
      logoImage: string;
      name: string;
    }[];
    hasUserApplied: boolean;
    isApplicationOpen?: boolean;
  };
  hasUserAlreadyAppliedOnDay?: boolean;
  wasUserAccepted?: boolean;
  refetch?: () => void;
}

const FlyTalksGroup: React.FC<FlyTalksGroupProps> = ({
  group,
  hasUserAlreadyAppliedOnDay,
  wasUserAccepted,
  refetch,
}) => {
  const navigate = useNavigate();
  const deleteFlyTalkApplication = useDeleteFlyTalkApplication();

  const isButtonDisabled = !group.isApplicationOpen && !group.hasUserApplied;

  const handleApplyClick = () => {
    if (!group.hasUserApplied) {
      navigate(`/app/fly-talks-apply?id=${group.id}`);
    } else {
      deleteFlyTalkApplication.mutate({ eventId: group.id });
      if (refetch) {
        refetch();
      }
    }
  };

  function getButtonText() {
    if (group.hasUserApplied) {
      return 'Odjavi termin';
    }
    if (isButtonDisabled) {
      return 'Prijave su zatvorene';
    }
    return 'Prijavi termin';
  }

  return (
    <div
      className={
        group.hasUserApplied
          ? wasUserAccepted
            ? `${c.group} ${c.groupAccepted}`
            : wasUserAccepted === false
              ? `${c.group} ${c.groupRejected}`
              : `${c.group} ${c.groupApplied}`
          : group.participantsNumber < 25
            ? c.group
            : `${c.group} ${c.groupFull}`
      }>
      <div className={c.groupHeader}>
        <div></div>
        <img className={c.starIcon} src={star} alt='' />
        <p>
          {!group.hasUserApplied
            ? `${group.participantsNumber}/25 PRIJAVLJENIH`
            : 'PRIJAVLJEN TERMIN'}
        </p>
      </div>
      <p className={c.groupDuration}>
        {group.start} - {group.end}
      </p>
      <div className={c.companiesList}>
        {group.companies.map((company, i) => (
          <div key={i} className={c.company}>
            <p>0{i + 1}</p>
            <img src={company.logoImage} alt='' />
            {i !== group.companies.length - 1 && (
              <div className={c.divider}></div>
            )}
          </div>
        ))}
        {(!hasUserAlreadyAppliedOnDay || group.hasUserApplied) && (
          <Button
            variant='orange'
            className={c.applyButton}
            onClick={handleApplyClick}
            disabled={isButtonDisabled}>
            {getButtonText()}
          </Button>
        )}
      </div>
      <div className={c.applianceDisclaimer}>
        <img src={warning} alt='' />
        <p>
          Nakon prijave sačekaj potvrdu firme. Možeš prijaviti samo jedan fly
          talk. Status termina: <span>u obradi</span>.
        </p>
      </div>
      <div className={c.applianceAccepted}>
        <img src={greenCheck} alt='' />
        <p>
          Status termina: <span> Prihvaćen si!</span> <br />
          Ako se predomisliš, slobodno se odjavi u bilo kojem trenutku.
        </p>
      </div>
      <div className={c.applianceRejected}>
        <img src={redX} alt='' />
        <p>
          Status termina: <span>Odbijen si.</span>
          <br />
          Nažalost ovog puta nisi među odabranima.
        </p>
      </div>
      <div className={c.fullGroupMessage}>
        <img src={sadEmoji} alt='' />
        <p>Ovaj termin je popunjen te ga zbog toga ne možeš prijaviti</p>
      </div>
    </div>
  );
};

export default FlyTalksGroup;
