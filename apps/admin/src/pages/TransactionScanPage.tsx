import { useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useVerifyTransactionItem } from '../api/shop/useVerifyTransactionItem';
import toast from 'react-hot-toast';

const TransactionScanPage = () => {
  const [isCooldown, setIsCooldown] = useState(false);
  const [lastScanMessage, setLastScanMessage] = useState('');
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const verifyTransactionMutation = useVerifyTransactionItem();

  const handleScan = (data: string) => {
    if (!data || isCooldown) return;

    try {
      const parsedData = JSON.parse(data);

      const { itemId, userId } = parsedData;

      setIsCooldown(true);
      setLastScanMessage(`Processing scan for user ID: ${parsedData.userId}`);

      verifyTransactionMutation.mutate(
        {
          itemId,
          userId,
        },
        {
          onSuccess: () => {
            toast.success('Transaction verified successfully!');
          },
          onError: (error) => {
            toast.error(`Error verifying transaction: ${error}`);
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

  return (
    <div>
      <h1>Transaction Scan Page</h1>
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
