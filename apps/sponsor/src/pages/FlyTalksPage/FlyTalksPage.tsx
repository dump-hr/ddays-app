import { UserToCompanyDto } from '@ddays-app/types/src/dto/user';
import { useEffect, useMemo, useState } from 'react';

import { useGetApplicants } from '../../api/flyTalks/useGetApplicants';
import { useGetFlyTalks } from '../../api/flyTalks/useGetFlyTaks';
import FlyTalkUserModal from '../../components/FlyTalkUserModal';
import InfoMessage from '../../components/InfoMessage';
import WhiteButton from '../../components/WhiteButton';
import { SPONSOR_FLY_TALK_DEADLINE } from '../../constants/dates';
import { formatDatetime } from '../../helpers/date';
import { calculateTimeLeft, formatTimeLeft } from '../../helpers/time';
import c from './FlyTalksPage.module.scss';
import TableRow from './TableRow';

const FlyTalksPage = () => {
  const targetTime = useMemo(() => SPONSOR_FLY_TALK_DEADLINE, []);
  const [modalUser, setModalUser] = useState<UserToCompanyDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<Date>(calculateTimeLeft(targetTime));

  function handleOpenModal(user: UserToCompanyDto) {
    setModalUser(user);
    setIsModalOpen(true);
  }

  const { data: applicants = [] } = useGetApplicants();
  const { data: tabs = [] } = useGetFlyTalks();

  const [selectedTab, setSelectedTab] = useState<string>('');

  useEffect(() => {
    if (tabs.length > 0 && !selectedTab) {
      setSelectedTab(tabs[0]);
    }
  }, [tabs, selectedTab]);

  const filteredApplicants = useMemo(() => {
    const datetime = selectedTab;
    return applicants.filter((a) => a.date === datetime);
  }, [applicants, selectedTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className={c.page}>
      {isModalOpen && (
        <FlyTalkUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={modalUser}
          setModalUser={setModalUser}
        />
      )}

      <div className={c.content}>
        <section className={c.titleSection}>
          <h2 className={c.title}>Fly Talks</h2>
          <p>
            Ukupno odabranih sudionika:{' '}
            {
              filteredApplicants.filter((applicant) => applicant.selected)
                .length
            }
            /{filteredApplicants.length}
          </p>
          {
            <div className={c.buttons}>
              {tabs
                .sort((b, a) => new Date(a).getTime() - new Date(b).getTime())
                .map((value) => (
                  <WhiteButton
                    variant={selectedTab === value ? 'primary' : 'secondary'}
                    key={value}
                    onClick={() => setSelectedTab(value)}>
                    {formatDatetime(value)}
                  </WhiteButton>
                ))}
            </div>
          }
        </section>
        {timeLeft.getTime() === 0 ? (
          <InfoMessage message='Odabir sudionika zatvoren.' />
        ) : (
          <InfoMessage
            message={`Odabir sudionika zatvorit će se u četvrtak 22. 5. u 12:00. (${formatTimeLeft(
              timeLeft,
            )})`}
          />
        )}

        {filteredApplicants.length === 0 ? (
          <p className={c.noApplicants}>Nema prijavljenih sudionika.</p>
        ) : (
          <>
            <table className={c.table}>
              <thead>
                <tr>
                  <th>status</th>
                  <th>ime i prezime</th>
                  <th>e-adresa</th>
                  <th>opis i poveznice</th>
                  <th>CV</th>
                  <th>Odabir</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants
                  .filter((a) => a.selected)
                  .map((applicant) => (
                    <TableRow
                      applicant={applicant}
                      key={applicant.id}
                      handleOpenModal={() => handleOpenModal(applicant)}
                      status='accepted'
                      timeLeft={timeLeft}
                    />
                  ))}
              </tbody>
            </table>
            {filteredApplicants.filter((applicant) => applicant.selected)
              .length !== 0 &&
              filteredApplicants.filter((applicant) => !applicant.selected)
                .length !== 0 && <hr className={c.break} />}
            <table className={c.table}>
              <tbody>
                {filteredApplicants
                  .filter((applicant) => !applicant.selected)
                  .map((applicant) => (
                    <TableRow
                      applicant={applicant}
                      key={applicant.id}
                      handleOpenModal={handleOpenModal}
                      status='rejected'
                      timeLeft={timeLeft}
                    />
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default FlyTalksPage;
