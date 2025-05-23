import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { QrReader } from 'react-qr-reader';

import { useAssignPrinter } from '@/api/printer/useAssignPrinter';
import { useGetAllPrinters } from '@/api/printer/useGetAllPrinters';
import Button from '@/components/Button';
import { SelectInput } from '@/components/SelectInput';

const AccreditationScanPage = () => {
  const assignPrinterMutation = useAssignPrinter();
  const { data: printers } = useGetAllPrinters();

  const [printerSelected, setPrinterSelected] = useState('');
  const [lastScanMessage, setLastScanMessage] = useState('');
  const [isOpenQRCode, setIsOpenQRCode] = useState(false);

  const isCooldownRef = useRef(false);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentPrinterRef = useRef(printerSelected);

  const printersDropdownData = useMemo(
    () => printers?.map((printer) => `${printer.id} - ${printer.name}`),
    [printers],
  );

  useEffect(() => {
    currentPrinterRef.current = printerSelected;
  }, [printerSelected]);

  const handleScan = (data: string) => {
    if (!data || isCooldownRef.current) return;

    try {
      const parsedData = JSON.parse(data);

      isCooldownRef.current = true;
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
        isCooldownRef.current = false;
        setLastScanMessage('Ready to scan next badge');
      }, 4000);
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      setLastScanMessage('Invalid QR code format');
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value.split(' - ')[0];
    setPrinterSelected(newValue);
    currentPrinterRef.current = newValue;
  };

  return (
    <div>
      <p>Printer selected: {printerSelected}</p>
      <SelectInput
        options={printersDropdownData || []}
        isAllowedEmpty={true}
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
          variant='orange'>
          {isOpenQRCode ? 'Close QR Code' : 'Open QR Code'}
        </Button>
      </div>
      {lastScanMessage && (
        <div
          style={{
            margin: '12px 0',
            padding: '8px',
            backgroundColor: isCooldownRef.current ? '#ffeeba' : '#d4edda',
            borderRadius: '4px',
          }}>
          {lastScanMessage}
          {isCooldownRef.current && <span> (Waiting cooldown...)</span>}
        </div>
      )}

      {isOpenQRCode && (
        <div className='scannerContainer'>
          <QrReader
            onResult={(result) => {
              if (!result) return;
              handleScan(result?.getText());
            }}
            constraints={{
              facingMode: 'environment',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AccreditationScanPage;
