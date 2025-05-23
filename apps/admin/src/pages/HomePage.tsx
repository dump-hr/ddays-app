import { EventWithUsersDto } from '@ddays-app/types';
import { useState } from 'react';

import { useEventGetAllWithRating } from '../api/event/useEventGetAllWithRating';
import { useGetWorkshopsWithUsers } from '../api/event/useGetWorkshopsWithUsers';
import { useGetUserCount } from '../api/user/useGetUserCount';
import { Modal } from '../components/Modal';
import c from './HomePage.module.scss';

export const HomePage = () => {
  const { data: userCount } = useGetUserCount();
  const { data: workshops } = useGetWorkshopsWithUsers();

  const [modals, setModals] = useState({
    workshops: false,
  });

  const [modalWorkshop, setModalWorkshop] = useState<EventWithUsersDto | null>(
    null,
  );

  const { data: eventsWithRatings } = useEventGetAllWithRating();

  function formatStartDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}. ${month}. u ${hours}:${minutes}`;
  }

  return (
    <>
      <Modal
        isOpen={modals.workshops}
        onClose={() => setModals((prev) => ({ ...prev, workshops: false }))}>
        <h2>Popis sudionika</h2>
        <button
          onClick={() =>
            navigator.clipboard.writeText(
              modalWorkshop?.users?.map((user) => user.email).join(',') || '',
            )
          }>
          Dohvati e-adrese
        </button>
        <table>
          <thead>
            <tr>
              <th>Ime i prezime</th>
              <th>E-adresa</th>
            </tr>
          </thead>
          <tbody>
            {modalWorkshop?.users?.map((user) => (
              <tr>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>

      <div className={c.page}>
        <h1>Statistike 2025.</h1>
        <div className={c.totalUsers}>
          <p>Trenutno korisnika:</p>
          <h3>{userCount}</h3>
        </div>
        <section className={c.section}>
          <h3 className={c.sectionTitle}>Ocjene</h3>
          <table>
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Tip</th>
                <th>Broj prijava</th>
                <th>Ocjena</th>
              </tr>
            </thead>
            <tbody>
              {eventsWithRatings?.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.type}</td>
                  <td>{event?.averageRating || 'problem'}</td>
                  <td>{event.averageRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className={c.section}>
          <h3 className={c.sectionTitle}>Radionice</h3>
          <table>
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Vrijeme</th>
                <th>Tema</th>
                <th>Broj prijava</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {workshops
                ?.sort((a, b) =>
                  new Date(a.startsAt) > new Date(b.startsAt) ? 1 : -1,
                )
                .map((workshop) => (
                  <tr key={workshop.id}>
                    <td>{workshop.name}</td>
                    <td>{formatStartDate(workshop.startsAt)}</td>
                    <td>{workshop.theme}</td>
                    <td>
                      {workshop.users?.length}/{workshop.maxParticipants}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setModalWorkshop(workshop);
                          setModals((prev) => ({ ...prev, workshops: true }));
                        }}>
                        Prikaz prijavljenih
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};
