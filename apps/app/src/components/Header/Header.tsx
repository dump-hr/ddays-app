import styles from './Header.module.scss';
import { HeaderCard } from './HeaderCard';

enum HeaderCards {
  ENTER_CODE,
  ACCREDIATION,
  SHOPPING,
}

type HeaderCardsInfo = {
  id: HeaderCards;
  icon: string;
  text: string;
  width: number;
  height: number;
};

const headerCards: HeaderCardsInfo[] = [
  {
    id: HeaderCards.ENTER_CODE,
    icon: 'enter-code',
    text: 'Unesi kod',
    width: 78,
    height: 34,
  },
  {
    id: HeaderCards.ACCREDIATION,
    icon: 'enter-code',
    text: 'Akreditacija',
    width: 78,
    height: 34,
  },
  {
    id: HeaderCards.SHOPPING,
    icon: 'enter-code',
    text: 'Shopping',
    width: 78,
    height: 34,
  },
];

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header}>Hello Mihaela! 👋🏻</h1>
      <div className={styles.headerOptionsWrapper}>
        {headerCards.map((card) => (
          <HeaderCard
            key={card.id}
            icon={card.icon}
            text={card.text}
            width={card.width}
            height={card.height}
          />
        ))}
      </div>
    </div>
  );
};
