import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import AvatarPointsCircle from '@/components/AvatarPointsCircle/AvatarPointsCircle';
import ProfileStat from '@/components/ProfileStat';
import { useNavigate } from 'react-router-dom';
import TempAvatar from '../../assets/images/temp-avatar.png';
import c from '../ProfileAchievementsPage/ProfileAchievementsPage.module.scss';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import CopyIcon from '@/assets/icons/copy-icon.svg';
import { Input } from '@/components/Input';
import s from './InviteCodePage.module.scss';
import Button from '@/components/Button';
import WhatsappIcon from '../../assets/icons/whatsapp-icon.svg';

export const InviteCodePage = () => {
  const { data: user } = useLoggedInUser();
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className={c.page}>
      <header className={c.header}>
        <div className={c.flexWrapper}>
          <p className={c.title}>
            <span>Postignuća</span> <br />
            {user?.firstName} {user?.lastName}
          </p>

          <AvatarPointsCircle avatar={user?.profilePhotoUrl || TempAvatar} />
        </div>

        <div className={c.stats}>
          <ProfileStat dataType='points' />
          <ProfileStat dataType='achievements' />
        </div>
      </header>
      <main className={c.main}>
        <header className={c.mainHeader}>
          <img
            src={ArrowLeft}
            alt=''
            className={c.arrowLeft}
            onClick={() => navigate(-1)}
          />
          <h3 className={c.title}>Postignuća</h3>
        </header>

        <div className={s.inputWrapper}>
          <Input
            value={user?.inviteCode ?? ''}
            disabled={true}
            placeholder='Moj kod'
            onChange={() => {}}
            rightIcon={CopyIcon}
            onRightIconClick={() => {
              navigator.clipboard.writeText(user?.inviteCode ?? '');
            }}
          />

          <Button variant='black' icon={WhatsappIcon} className={s.shareButton}>
            Podijeli kod
          </Button>
        </div>
      </main>
    </div>
  );
};
