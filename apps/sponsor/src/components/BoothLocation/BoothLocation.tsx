import { BoothDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useState } from 'react';

import tlocrt from '../../assets/images/tlocrt.png';
import classes from './BoothLocation.module.scss';

export interface BoothLocationProps {
  Spots: BoothDto[];
}

export const BoothLocation = () => {
  const [spots, setSpots] = useState<BoothDto[]>([]);
  const [chosenSpot, setChosenSpot] = useState<number>();

  const handleChoose = (id: number) => {
    const spot = spots.find((spot) => spot.id === id);
    if (!spot || spot.isTaken) {
      return;
    }
    setChosenSpot(id);
  };

  const handleSelect = () => {
    if (!chosenSpot) {
      return;
    }

    const newSpots = spots.map((spot) => {
      if (spot.id === chosenSpot) {
        return {
          ...spot,
          isTaken: !spot.isTaken,
        };
      }

      return spot;
    });

    setSpots(newSpots);
  };

  return (
    <section className={classes.container}>
      <article className={classes.choice}>
        <span className={classes.title}>Odaberite svoje mjesto</span>
        <ul className={classes.spots}>
          {spots.map((spot) => (
            <li
              className={clsx(
                classes.spot,
                spot.id === chosenSpot && classes.choosen,
                spot.isTaken && classes.taken,
              )}
              key={spot.id}
              onClick={() => !spot.isTaken && handleChoose(spot.id)}>
              {spot.name}
            </li>
          ))}
        </ul>
        <button
          className={clsx(classes.button, !chosenSpot && classes.disabled)}
          onClick={handleSelect}
          disabled={!chosenSpot}>
          Odaberi
        </button>
      </article>
      <aside className={classes.map}>
        <img src={tlocrt} alt='Mapa štanda' />
      </aside>
    </section>
  );
};
