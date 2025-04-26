import { QrReader } from 'react-qr-reader';
import c from './AchievementScannerPage.module.scss';
import { useState } from 'react';
import ScannedAchievementPopup from './popups/ScannedAchievementPopup';
import { QrCodeData, QrCodeDataType } from '@/types/qr/qr';
import toast from 'react-hot-toast';
import { useAchievementGetByUuid } from '@/api/achievement/useAchievementGetByUuid';

const AchievementScannerPage = () => {
  const [data, setData] = useState('');
  const { data: achievement } = useAchievementGetByUuid(data);
  const [isOpen, setIsOpen] = useState(false);

  function handleScan(data: string) {
    if (!data || isOpen) return;

    let parsedData: QrCodeData | null = null;

    try {
      parsedData = JSON.parse(data) as QrCodeData;
    } catch {
      toast.error('Ovaj QR kod nije ispravan!');
      return;
    }

    if (!parsedData) {
      toast.error('Podaci nisu ispravni!');
      return;
    }

    if (parsedData.dataType !== QrCodeDataType.ACHIEVEMENT) {
      toast.error('Ovo nije postignuće!');
      return;
    }

    setData(parsedData.data);
    setIsOpen(true);
  }

  return (
    <>
      <div className={c.page}>
        <QrReader
          onResult={(result) => {
            if (!result || isOpen) return;
            handleScan(result?.getText());
          }}
          className={c.qrReader}
          constraints={{
            facingMode: 'environment',
          }}
        />
      </div>

      <ScannedAchievementPopup
        isOpen={isOpen}
        closePopup={() => {
          setIsOpen(false);
          setData('');
        }}
        achievement={achievement}
      />
    </>
  );
};

export default AchievementScannerPage;
