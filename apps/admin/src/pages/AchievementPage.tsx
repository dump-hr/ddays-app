import { AchievementDto } from '@ddays-app/types';
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';

import { useAchievementGetAllWithUuid } from '../api/achievement/useAchievementGetAllWithUuid';
import { useAchievementRemove } from '../api/achievement/useAchievementRemove';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { AchievementForm } from '../forms/AchievementForm';

const AchievementPage = () => {
  const achievements = useAchievementGetAllWithUuid();

  const removeAchievement = useAchievementRemove();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
  const [achievementToEdit, setAchievementToEdit] = useState<AchievementDto>();
  const [qrCodeAchievementUuid, setQrCodeAchievementUuid] = useState<string>();

  const qrCodeContainerRef = useRef<HTMLDivElement | null>(null);

  const downloadSvg = () => {
    if (qrCodeContainerRef.current) {
      const svgElement = qrCodeContainerRef.current.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `qrcode-${qrCodeAchievementUuid}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  if (achievements.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}>
        <AchievementForm
          onSuccess={() => setIsModalOpen(false)}
          achievement={achievementToEdit}
        />
      </Modal>

      <Modal isOpen={isQrCodeOpen} onClose={() => setIsQrCodeOpen(false)}>
        <div ref={qrCodeContainerRef}>
          <QRCode
            value={
              '{"dataType":"achievement","data":"' +
              qrCodeAchievementUuid +
              '"}'
            }
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button onClick={downloadSvg}>Download as SVG</Button>
        </div>
      </Modal>

      <div className='flex'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New
        </Button>
        <Button variant='secondary' onClick={() => console.log(achievements)}>
          Log Achievements
        </Button>
      </div>
      <Table
        data={(achievements.data || []).map((achievement) => ({
          ...achievement,
        }))}
        actions={[
          {
            label: 'QR',
            action: (achievement) => {
              setQrCodeAchievementUuid(achievement.uuid);
              setIsQrCodeOpen(true);
            },
          },
          {
            label: 'Uredi',
            action: (achievement) => {
              setAchievementToEdit(achievement);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: (achievement) => {
              if (confirm('Are you sure?')) {
                removeAchievement.mutateAsync(achievement.id);
              }
            },
          },
        ]}
      />
    </>
  );
};

export default AchievementPage;
