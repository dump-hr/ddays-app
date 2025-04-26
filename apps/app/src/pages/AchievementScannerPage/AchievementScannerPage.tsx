import { QrReader } from 'react-qr-reader';
import c from './AchievementScannerPage.module.scss';
import { useRef, useState } from 'react';
import ScannedAchievementPopup from './popups/ScannedAchievementPopup';
import { QrCodeData, QrCodeDataType } from '@/types/qr/qr';
import toast from 'react-hot-toast';
import { useAchievementGetByUuid } from '@/api/achievement/useAchievementGetByUuid';
import ArrowLeft from '@/assets/icons/arrow-left-white.svg';
import { useNavigate } from 'react-router-dom';

const AchievementScannerPage = () => {
  const [data, setData] = useState('');
  const { data: achievement } = useAchievementGetByUuid(data);
  const [isOpen, setIsOpen] = useState(false);
  const lastScanTimeRef = useRef<number>(0);

  function handleScan(data: string) {
    const currentTime = Date.now();

    if (currentTime - lastScanTimeRef.current < 3000) {
      return;
    }

    lastScanTimeRef.current = currentTime;

    if (!data || isOpen) return;

    let parsedData: QrCodeData | null = null;

    try {
      parsedData = JSON.parse(data) as QrCodeData;
    } catch {
      toast.error(
        'Ovaj QR kod nije ispravan! ' +
          currentTime +
          ' ' +
          lastScanTimeRef.current,
      );
      return;
    }

    if (parsedData.dataType !== QrCodeDataType.ACHIEVEMENT) {
      toast.error('Ovo nije postignuće!');
      return;
    }

    setData(parsedData.data);
    setIsOpen(true);
  }

  const navigate = useNavigate();

  return (
    <>
      <div className={c.page}>
        <button className={c.backButton} onClick={() => navigate(-1)}>
          <img src={ArrowLeft} alt='' />
        </button>
        <h1 className={c.title}>Skeniraj QR kod!</h1>
        <div className={c.readerWrapper}>
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
