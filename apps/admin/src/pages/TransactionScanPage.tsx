import { useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';

import { useVerifyTransactionItem } from '../api/shop/useVerifyTransactionItem';

const TransactionScanPage = () => {
  const isCooldownRef = useRef(false);
  const [lastScanMessage, setLastScanMessage] = useState('');
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const verifyTransactionMutation = useVerifyTransactionItem();

  const handleScan = (data: string) => {
    if (!data || isCooldownRef.current) return;

    try {
      const parsedData = JSON.parse(data);

      const { itemId, userId } = parsedData;

      isCooldownRef.current = true;
      setLastScanMessage(`Processing scan for user ID: ${parsedData.userId}`);

      verifyTransactionMutation.mutate({
        itemId,
        userId,
      });

      cooldownTimerRef.current = setTimeout(() => {
        isCooldownRef.current = false;
        setLastScanMessage('Ready to scan next transaction');
      }, 4000);
    } catch (error) {
      console.error('Error parsing QR code data:', error);
      setLastScanMessage('Invalid QR code format');
    }
  };

  return (
    <div>
      <h1>Transaction Scan Page</h1>
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
      <div>
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
      <p>Scan a QR code to verify a transaction.</p>
    </div>
  );
};

export default TransactionScanPage;
