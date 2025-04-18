import { BoothPublicDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { io } from 'socket.io-client';

import { useGetBooths } from '../../api/booth/useGetBooths';
import { useReserveBooth } from '../../api/booth/useReserveBooth';
import floorPlan from '../../assets/images/floor-plan-2025.png';
import c from './ChooseBooth.module.scss';

const socket = io();

export const ChooseBooth = () => {
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const booths = useGetBooths();
  const reserveBooth = useReserveBooth();

  useEffect(() => {
    socket.on('booth:reserve', ({ id }: { id: number }) => {
      queryClient.setQueryData(['booth'], (prev?: BoothPublicDto[]) =>
        (prev || []).map((booth) =>
          booth.id === id ? { ...booth, isTaken: true } : booth,
        ),
      );

      setSelectedBoothId((prev) => (prev === id ? null : prev));
    });

    socket.on('booth:clear', ({ id }: { id: number }) => {
      queryClient.setQueryData(['booth'], (prev?: BoothPublicDto[]) =>
        (prev || []).map((booth) =>
          booth.id === id ? { ...booth, isTaken: false } : booth,
        ),
      );
    });

    return () => {
      socket.off('booth:reserve');
      socket.off('booth:clear');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReserve = async () => {
    if (!selectedBoothId) {
      return;
    }

    await reserveBooth.mutateAsync(selectedBoothId);
  };

  if (booths.isLoading || !booths.data) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}>
        Loading...
      </div>
    );
  }

  return (
    <section className={c.container}>
      <article className={c.choice}>
        <span className={c.title}>Odaberite svoje mjesto</span>
        <ul className={c.spots}>
          {booths.data
            .sort((a, b) => a.id - b.id)
            .map((booth) => (
              <li
                className={clsx(c.spot, {
                  [c.chosen]: booth.id === selectedBoothId,
                  [c.taken]: booth.isTaken,
                })}
                key={booth.id}
                onClick={() => !booth.isTaken && setSelectedBoothId(booth.id)}>
                <span className={c.text}>{booth.name}</span>
              </li>
            ))}
        </ul>
        <button
          className={clsx(c.button, !selectedBoothId && c.disabled)}
          onClick={handleReserve}
          disabled={!selectedBoothId || reserveBooth.isLoading}>
          Odaberi
        </button>
      </article>
      <aside className={c.map}>
        <img src={floorPlan} alt='Mapa štanda' />
      </aside>
    </section>
  );
};
