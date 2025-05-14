import { useState, useRef, useEffect } from 'react';
import { SelectInput } from '../components/SelectInput';
import { QrReader } from 'react-qr-reader';
import { Button } from '../components/Button';
import { useAssignPrinter } from '../api/printer/useAssignPrinter';

const AccreditationScanPage = () => {
  const [printerSelected, setPrinterSelected] = useState(
    Number(localStorage.getItem('printerIdForScan') || '1'),
  );
  const [isOpenQRCode, setIsOpenQRCode] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [lastScanMessage, setLastScanMessage] = useState('');
  const assignPrinterMutation = useAssignPrinter();
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleScan = (data: string) => {
    if (!data || isCooldown) return;

    try {
      const parsedData = JSON.parse(data);
      console.log('Parsed QR Code Data:', parsedData.userId);

      // Set cooldown flag to prevent new scans
      setIsCooldown(true);
      setLastScanMessage(`Processing scan for user ID: ${parsedData.userId}`);

      // Call API
      assignPrinterMutation.mutate({
        printerId: printerSelected,
        userId: parsedData.userId,
      });

      // Start cooldown timer
      cooldownTimerRef.current = setTimeout(() => {
        setIsCooldown(false);
        setLastScanMessage('Ready to scan next badge');
      }, 5000);
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      setLastScanMessage('Invalid QR code format');
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrinterSelected(Number(e.target.value));
    localStorage.setItem('printerIdForScan', e.target.value);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>Accreditation</h1>
      <p>Printer selected:</p>
      <SelectInput
        options={['1', '2']}
        onChange={handleSelectChange}
        isAllowedEmpty={true}
        defaultValue={String(printerSelected)}
      />

      <Button
        onClick={() => {
          setIsOpenQRCode(!isOpenQRCode);
        }}
        variant='primary'>
        {isOpenQRCode ? 'Close QR Code' : 'Open QR Code'}
      </Button>

      {/* Status message */}
      {lastScanMessage && (
        <div
          style={{
            margin: '12px 0',
            padding: '8px',
            backgroundColor: isCooldown ? '#ffeeba' : '#d4edda',
            borderRadius: '4px',
          }}>
          {lastScanMessage}
          {isCooldown && <span> (Waiting cooldown...)</span>}
        </div>
      )}

      {isOpenQRCode && (
        <QrReader
          onResult={(result) => {
            if (!result) return;
            handleScan(result?.getText());
          }}
          constraints={{
            facingMode: 'environment',
          }}
        />
      )}
    </div>
  );
};

export default AccreditationScanPage;
