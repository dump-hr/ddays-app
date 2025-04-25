import { QrReader } from 'react-qr-reader';
import c from './AchievementScannerPage.module.scss';
import { useState } from 'react';
import ScannedAchievementPopup from './popups/ScannedAchievementPopup';
import { QrCodeData, QrCodeDataType } from '@/types/qr/qr';
import toast from 'react-hot-toast';

const AchievementScannerPage = () => {
  const [data] = useState('No result');
  const [isOpen, setIsOpen] = useState(false);

  function handleScan(data: string) {
    if (!data || isOpen) return;

    let parsedData: QrCodeData | null = null;

    try {
      parsedData = JSON.parse(data) as QrCodeData;
    } catch (error) {
      toast.error('Greška prilikom parsiranja podataka! ' + error);
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

    toast.success('Postignuće skenirano! ' + parsedData.data);
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
        <p>{data}</p>
      </div>
      <ScannedAchievementPopup
        isOpen={isOpen}
        closePopup={() => setIsOpen(false)}
        achievementId={data}
      />
    </>
  );
};

export default AchievementScannerPage;
