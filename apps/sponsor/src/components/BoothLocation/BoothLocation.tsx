import { BoothDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useState } from 'react';

import tlocrt from '../../assets/images/tlocrt.png';
import classes from './BoothLocation.module.scss';

export interface BoothLocationProps {
  initSpots?: BoothDto[];
}

export const BoothLocation = ({ initSpots = [] }: BoothLocationProps) => {
  const [spots, setSpots] = useState<BoothDto[]>(initSpots);
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

    setChosenSpot(undefined);
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
                spot.id === chosenSpot && classes.chosen,
                spot.isTaken && classes.taken,
              )}
              key={spot.id}
              onClick={() => !spot.isTaken && handleChoose(spot.id)}>
              <span className={classes.text}>{spot.name}</span>
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
