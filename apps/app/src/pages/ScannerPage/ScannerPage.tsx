import { Scanner } from '@yudiel/react-qr-scanner';
import c from './ScannerPage.module.scss';
import { useRef, useState } from 'react';
import { QrCodeData, QrCodeDataType } from '@/types/qr/qr';
import toast from 'react-hot-toast';
import { useAchievementGetByUuid } from '@/api/achievement/useAchievementGetByUuid';
import ArrowLeft from '@/assets/icons/arrow-left-white.svg';
import { useNavigate } from 'react-router-dom';
import { useAchievementGetCompleted } from '@/api/achievement/useAchievementGetCompleted';

import { useCodeGetApplied } from '@/api/code/useCodeGetApplied';
import AppliedCodeAchievementPopup from '@/components/AppliedCodeAchievementPopup';
import { useLoggedInUser } from '@/api/auth/useLoggedInUser';
import ScannedAchievementPopup from './popups/ScannedAchievementPopup';
import ScannedCodePopup from './popups/ScannedCodePopup';
import { useGeoValidation } from '@/hooks/useGeoValidation';

const ScannerPage = () => {
  const [scannedAchievement, setScannedAchievement] = useState('');
  const [scannedCode, setScannedCode] = useState('');
  const [scannedPoints, setScannedPoints] = useState(0);
  const [
    isAppliedCodeAchievementPopupOpen,
    setIsAppliedCodeAchievementPopupOpen,
  ] = useState(false);

  const { data: achievement } = useAchievementGetByUuid(scannedAchievement);
  const { data: completedAchievements } = useAchievementGetCompleted();
  const geolocation = useGeoValidation();

  const { data: appliedCodes } = useCodeGetApplied();
  const { data: user } = useLoggedInUser();

  const [isOpen, setIsOpen] = useState(false);
  const lastScanTimeRef = useRef<number>(0);

  function handleScan(data: string) {
    const currentTime = Date.now();

    if (currentTime - lastScanTimeRef.current < 3000) {
      return;
    }

    if (geolocation.isOk === false) {
      toast.error(
        `Ne možete skenirati QR kod izvan dozvoljene lokacije ili je preciznost GPS-a preniska. ${geolocation.error ?? 'neki error'}`,
      );
      return;
    }

    lastScanTimeRef.current = currentTime;

    if (!data || isOpen) return;

    let parsedData: QrCodeData | null = null;

    try {
      parsedData = JSON.parse(data) as QrCodeData;
    } catch {
      toast.error('Ovaj QR kod nije ispravan!', {
        position: 'top-center',
      });
      return;
    }

    switch (parsedData.dataType) {
      case QrCodeDataType.ACHIEVEMENT:
        setScannedAchievement(parsedData.data);
        break;
      case QrCodeDataType.CODE:
        setScannedCode(parsedData.data);
        break;
    }

    setIsOpen(true);
  }

  const navigate = useNavigate();

  function stopCamera() {
    const videoElement = document.querySelector('video');
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoElement.srcObject = null;

      navigator.mediaDevices
        .getUserMedia({ video: false })
        .then(() => {
          console.log('Camera permissions released');
        })
        .catch((err) => {
          console.error('Error resetting permissions', err);
        });
    }
  }

  function handleArrowClick() {
    navigate(-1);
    stopCamera();
  }

  function handleClosePopup(points?: number) {
    setIsOpen(false);
    setScannedAchievement('');
    setScannedCode('');

    if (typeof points !== 'number' || isNaN(points) || points === 0) {
      return;
    }

    setScannedPoints(points);
    setIsAppliedCodeAchievementPopupOpen(true);
  }

  return (
    <>
      <div className={c.page}>
        <button className={c.backButton} onClick={handleArrowClick}>
          <img src={ArrowLeft} alt='' />
        </button>
        <h1 className={c.title}>Skeniraj QR kod!</h1>
        <div className={c.readerWrapper}>
          <div className={c.qrReader}>
            <Scanner
              onScan={(results) => {
                if (!results || results.length === 0 || isOpen) return;
                handleScan(results[0].rawValue);
              }}
              onError={(error) => console.error(error)}
              constraints={{
                facingMode: 'environment',
              }}
            />
          </div>
        </div>
      </div>

      {scannedAchievement && achievement && (
        <ScannedAchievementPopup
          uuid={scannedAchievement}
          isOpen={isOpen}
          closePopup={handleClosePopup}
          achievement={achievement}
          isCompleted={
            completedAchievements?.some((a) => a.id === achievement?.id) ||
            false
          }
        />
      )}
      {scannedCode && (
        <ScannedCodePopup
          code={scannedCode}
          isOpen={isOpen}
          closePopup={handleClosePopup}
          isAlreadyApplied={
            appliedCodes?.some((code) => code.value === scannedCode) || false
          }
        />
      )}

      <AppliedCodeAchievementPopup
        user={user}
        isOpen={isAppliedCodeAchievementPopupOpen}
        points={scannedPoints}
        resetPoints={() => setScannedPoints(0)}
      />
    </>
  );
};

export default ScannerPage;
