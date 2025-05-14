import { useState, useRef, useEffect } from 'react';
import { SelectInput } from '../components/SelectInput';
import { QrReader } from 'react-qr-reader';
import { Button } from '../components/Button';
import { useAssignPrinter } from '../api/printer/useAssignPrinter';
import { toast } from 'react-hot-toast';

const AccreditationScanPage = () => {
  const [printerSelected, setPrinterSelected] = useState(() => {
    return localStorage.getItem('printerIdForScan') || '1';
  });

  const currentPrinterRef = useRef(printerSelected);

  const [isOpenQRCode, setIsOpenQRCode] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [lastScanMessage, setLastScanMessage] = useState('');
  const assignPrinterMutation = useAssignPrinter();
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    currentPrinterRef.current = printerSelected;
  }, [printerSelected]);

  const handleScan = (data: string) => {
    if (!data || isCooldown) return;

    try {
      const parsedData = JSON.parse(data);

      setIsCooldown(true);
      setLastScanMessage(`Processing scan for user ID: ${parsedData.userId}`);

      const currentPrinter = currentPrinterRef.current;

      assignPrinterMutation.mutate(
        {
          printerId: Number(currentPrinter),
          userId: Number(parsedData.userId),
        },
        {
          onSuccess: () => {
            toast.success('Akreditacija uspješno skenirana!');
          },
          onError: () => {
            toast.error('Neuspješno skeniranje akreditacije!');
          },
        },
      );

      cooldownTimerRef.current = setTimeout(() => {
        setIsCooldown(false);
        setLastScanMessage('Ready to scan next badge');
      }, 4000);
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      setLastScanMessage('Invalid QR code format');
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setPrinterSelected(newValue);
    currentPrinterRef.current = newValue;
    localStorage.setItem('printerIdForScan', newValue);
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
      <p>Printer selected: {printerSelected}</p>
      <SelectInput
        options={['1', '2']}
        onChange={handleSelectChange}
        defaultValue={printerSelected}
      />
      <div className='flex'>
        <Button
          onClick={() => {
            if (!currentPrinterRef.current) {
              toast.error('Please select a printer first!');
              return;
            }
            setIsOpenQRCode(!isOpenQRCode);
          }}
          variant='primary'>
          {isOpenQRCode ? 'Close QR Code' : 'Open QR Code'}
        </Button>
      </div>
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
