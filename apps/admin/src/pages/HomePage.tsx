import { EventType, EventWithUsersDto } from '@ddays-app/types';
import clsx from 'clsx';
import { useState } from 'react';

import { useBoothGetAllWithRating } from '../api/booth/useBoothGetAllWithRating';
import { useEventGetAllWithRating } from '../api/event/useEventGetAllWithRating';
import { useGetWorkshopsWithUsers } from '../api/event/useGetWorkshopsWithUsers';
import { useGetUserCount } from '../api/user/useGetUserCount';
import { Modal } from '../components/Modal';
import { getRatingColor } from '../helpers/color';
import c from './HomePage.module.scss';

export const HomePage = () => {
  const [ratingTab, setRatingTab] = useState<EventType>(EventType.LECTURE);

  const { data: userCount } = useGetUserCount();
  const { data: workshops } = useGetWorkshopsWithUsers();

  const [modals, setModals] = useState({
    workshops: false,
  });

  const [modalWorkshop, setModalWorkshop] = useState<EventWithUsersDto | null>(
    null,
  );

  const { data: eventsWithRating } = useEventGetAllWithRating();
  const { data: boothsWithRating } = useBoothGetAllWithRating();

  function formatStartDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}. ${month}. u ${hours}:${minutes}`;
  }

  function getTypeString(type: EventType) {
    switch (type) {
      case EventType.LECTURE:
        return 'Predavanje';
      case EventType.WORKSHOP:
        return 'Radionica';
      case EventType.PANEL:
        return 'Panel';
      case EventType.CAMPFIRE_TALK:
        return 'Campfire talk';
      case EventType.FLY_TALK:
        return 'Fly talk';
      case EventType.OTHER:
        return 'Ostalo';
      default:
        return 'Neodređeno';
    }
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
          <h3 className={c.sectionTitle}>Ocjene - Događaji</h3>
          <div className={c.tabContainer}>
            {Object.values(EventType)
              .filter(
                (type) =>
                  type !== EventType.OTHER && type !== EventType.FLY_TALK,
              )
              .map((type) => (
                <button
                  key={type}
                  className={clsx(c.tab, {
                    [c.active]: type === ratingTab,
                  })}
                  onClick={() => setRatingTab(type)}>
                  {getTypeString(type)}
                </button>
              ))}
          </div>
          <table id={c.eventRatings}>
            <thead>
              <tr>
                <th>Naziv</th>
                <th>Broj prijava</th>
                <th>Broj ocjena</th>
                <th>Ocjena</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {eventsWithRating
                ?.filter((e) => e.type === ratingTab)
                .sort((a, b) => a.name.localeCompare(b.name))
                .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
                .map((event) => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td>{event.numberOfApplications || '-'}</td>
                    <td>
                      {event.numberOfRatings ? (
                        <>
                          {event.numberOfRatings / 3}{' '}
                          <span>({event.numberOfRatings})</span>
                        </>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {Math.round((event?.averageRating || 0) * 1000) / 1000 ||
                        '-'}
                    </td>
                    <td className={c.ratingCell}>
                      {event.averageRating ? (
                        <div
                          className={c.ratingMarker}
                          style={{
                            backgroundColor: getRatingColor(
                              event?.averageRating || 0,
                            ),
                          }}
                        />
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <section className={c.section}>
          <h3 className={c.sectionTitle}>Ocjene - Štandovi</h3>
          <table id={c.boothRatings}>
            <thead>
              <tr>
                <th>Štand</th>
                <th>Kompanija</th>
                <th>Broj ocjena</th>
                <th>Ocjena</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {boothsWithRating
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
                .map((booth) => (
                  <tr key={booth.id}>
                    <td>{booth.name}</td>
                    <td>{booth.companyName}</td>
                    <td>{booth.numberOfRatings || '-'}</td>
                    <td>
                      {Math.round((booth?.averageRating || 0) * 1000) / 1000 ||
                        '-'}
                    </td>
                    <td className={c.ratingCell}>
                      {booth.averageRating && (
                        <div
                          className={c.ratingMarker}
                          style={{
                            backgroundColor: getRatingColor(
                              booth?.averageRating || 0,
                            ),
                          }}
                        />
                      )}
                    </td>
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
