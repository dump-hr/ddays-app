import { useNavigate } from 'react-router-dom';
import { HeaderCard } from '../HeaderCard/HeaderCard';
//import accreditationImage from './../../../assets/images/accreditationIcon.png';
import enterCodeImage from '@/assets/images/enterCodeIcon.png';
import tShirtImage from '@/assets/images/tShirtIcon.png';
import styles from './HeaderCardsWrapper.module.scss';
import { RouteNames } from '@/router/routes';
import { useState } from 'react';
import Accreditation from '@/components/Accreditation';

enum HeaderCards {
  ENTER_CODE,
  ACCREDITATION,
  SHOPPING,
}

type HeaderCardsInfo = {
  id: HeaderCards;
  img: string;
  text: string;
  width: number;
  height: number;
  onClick?: () => void;
  openCodePopup?: () => void;
};

type HeaderCardsWrapperProps = {
  openCodePopup?: () => void;
};

export const HeaderCardsWrapper: React.FC<HeaderCardsWrapperProps> = ({
  openCodePopup,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const headerCards: HeaderCardsInfo[] = [
    {
      id: HeaderCards.ENTER_CODE,
      img: `${enterCodeImage}`,
      text: 'Unesi kod',
      width: 77,
      height: 34,
      onClick: () => openCodePopup && openCodePopup(),
    },
    /*
    {
      id: HeaderCards.ACCREDITATION,
      img: `${accreditationImage}`,
      text: 'Akreditacija',
      width: 60,
      height: 39,
      onClick: () => {
        setIsPopupOpen(true);
      },
    },*/
    {
      id: HeaderCards.SHOPPING,
      img: `${tShirtImage}`,
      text: 'Shopping',
      width: 80,
      height: 36,
      onClick: () => navigate(RouteNames.SHOPPING),
    },
  ];

  return (
    <>
      <div className={styles.headerCardsWrapper}>
        {headerCards.map((card) => (
          <HeaderCard
            key={card.id}
            img={card.img}
            text={card.text}
            imgWidth={card.width}
            imgHeight={card.height}
            onClick={card.onClick}
          />
        ))}
      </div>
      <Accreditation
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
};
