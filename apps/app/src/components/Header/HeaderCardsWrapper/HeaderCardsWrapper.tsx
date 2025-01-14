import { HeaderCard } from '../HeaderCard/HeaderCard';
import accreditationImage from './../../../assets/images/Akreditacija.png';
import enterCodeImage from './../../../assets/images/unesiKod.png';
import tShirtImage from './../../../assets/images/majica.png';
import styles from './HeaderCardsWrapper.module.scss';

enum HeaderCards {
  ENTER_CODE,
  ACCREDIATION,
  SHOPPING,
}

type HeaderCardsInfo = {
  id: HeaderCards;
  img: string;
  text: string;
  width: number;
  height: number;
};

const headerCards: HeaderCardsInfo[] = [
  {
    id: HeaderCards.ENTER_CODE,
    img: `${enterCodeImage}`,
    text: 'Unesi kod',
    width: 77,
    height: 34,
  },
  {
    id: HeaderCards.ACCREDIATION,
    img: `${accreditationImage}`,
    text: 'Akreditacija',
    width: 60,
    height: 39,
  },
  {
    id: HeaderCards.SHOPPING,
    img: `${tShirtImage}`,
    text: 'Shopping',
    width: 80,
    height: 36,
  },
];

export const HeaderCardsWrapper = () => {
  return (
    <div className={styles.headerCardsWrapper}>
      {headerCards.map((card) => (
        <HeaderCard
          key={card.id}
          img={card.img}
          text={card.text}
          width={card.width}
          height={card.height}
        />
      ))}
    </div>
  );
};
