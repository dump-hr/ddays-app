import { AvailabilityUpdateDto, BoothDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { useReserveBooth } from '../../api/booth/useReserveBooth';
import tlocrt from '../../assets/images/tlocrt.png';
import classes from './BoothLocation.module.scss';

export interface BoothLocationProps {
  initSpots?: BoothDto[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket?: any;
}

export const BoothLocation = ({
  initSpots = [],
  socket,
}: BoothLocationProps) => {
  const [spots, setSpots] = useState<BoothDto[]>(initSpots);
  const [chosenSpot, setChosenSpot] = useState<number>();
  const reserveSpot = useReserveBooth();

  // useEffect(() => {
  //   setSpots(initSpots);
  // }, [initSpots]);

  useEffect(() => {
    socket.on('booth:update-available', (data: AvailabilityUpdateDto) => {
      const newSpots = spots.map((spot) => {
        if (spot.id === data.id) {
          return {
            ...spot,
            isTaken: data.isAvailable,
          };
        }

        return spot;
      });

      setSpots(newSpots);
    });

    return () => {
      socket.off('booth:update-available');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChoose = (id: number) => {
    const spot = spots.find((spot) => spot.id === id);
    if (!spot || spot.isTaken) {
      return;
    }
    setChosenSpot(id);
  };

  const handleSelect = async () => {
    if (!chosenSpot) {
      return;
    }

    await reserveSpot.mutateAsync(chosenSpot);

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
          {spots
            .sort((a, b) => a.id - b.id)
            .map((spot) => (
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
