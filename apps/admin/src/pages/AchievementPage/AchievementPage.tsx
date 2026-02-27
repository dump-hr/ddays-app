import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { TableDashboard } from '../../components/TableDashboard';
import { useAchievementGetAllWithUuid } from '../../api/achievement/useAchievementGetAllWithUuid';
import { AchievementForm } from '../../forms/AchievementForm';
import { toast } from 'react-hot-toast';
import { useAchievementRemove } from '../../api/achievement/useAchievementRemove';
import { DataRow } from '../../types/table';

import c from './AchievementPage.module.scss';

export const AchievementPage = () => {
  const { data: achievements, refetch } = useAchievementGetAllWithUuid();
  const removeAchievement = useAchievementRemove();
  const [qrData, setQrData] = useState<{
    uuid: string;
    name: string;
  } | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeAchievement.mutateAsync(id);
      }
      refetch();
    }
  };

  const handleDownloadQr = () => {
    if (!qrRef.current || !qrData) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `qr-achievement-${qrData.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (!achievements) return <div>Loading...</div>;

  return (
    <>
      <TableDashboard
        data={achievements}
        dataType='AchievementDto'
        onRefresh={refetch}
        renderForm={(onSuccess, id) => {
          const achievement = achievements.find((b) => b.id === id);
          return (
            <AchievementForm onSuccess={onSuccess} achievement={achievement} />
          );
        }}
        onDelete={handleDelete}
        onEdit={() => {}}
        renderRowAction={(row: DataRow) => {
          const uuid = row.uuid as string;
          if (!uuid) return null;
          return (
            <button
              className={c.qrButton}
              onClick={() =>
                setQrData({ uuid, name: String(row.name) })
              }>
              QR
            </button>
          );
        }}
      />

      {qrData && (
        <div className={c.qrBackdrop} onClick={() => setQrData(null)}>
          <div className={c.qrModal} onClick={(e) => e.stopPropagation()}>
            <div className={c.qrHeader}>
              <h3>{qrData.name}</h3>
              <button
                className={c.qrCloseButton}
                onClick={() => setQrData(null)}>
                &times;
              </button>
            </div>
            <div ref={qrRef} className={c.qrContainer}>
              <QRCode
                value={JSON.stringify({
                  dataType: 'achievement',
                  data: qrData.uuid,
                })}
                size={256}
              />
            </div>
            <button className={c.qrDownloadButton} onClick={handleDownloadQr}>
              Preuzmi PNG
            </button>
          </div>
        </div>
      )}
    </>
  );
};
