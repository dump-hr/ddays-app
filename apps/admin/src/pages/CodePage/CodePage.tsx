import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { TableDashboard } from '../../components/TableDashboard';
import { CodeForm } from '../../forms/CodeForm';
import { useCodeGetAll } from '../../api/code/useCodeGetAll';
import toast from 'react-hot-toast';
import { useCodeRemove } from '../../api/code/useCodeRemove';
import { DataRow } from '../../types/table';

import c from './CodePage.module.scss';

export const CodePage = () => {
  const { data: codes, refetch } = useCodeGetAll();
  const removeCode = useCodeRemove();
  const [qrValue, setQrValue] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDelete = async (ids: number[]) => {
    if (ids.length > 10) {
      toast.error('Možete obrisati maksimalno 10 zapisa odjednom.');
      return;
    }

    if (confirm('Jesi li siguran da želiš obrisati odabrane zapise?')) {
      for (const id of ids) {
        await removeCode.mutateAsync(id);
      }
      refetch();
    }
  };

  const handleDownloadQr = () => {
    if (!qrRef.current) return;
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
      link.download = `qr-${qrValue}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (!codes) return <div>Loading...</div>;

  return (
    <>
      <TableDashboard
        data={codes}
        dataType='CodeDto'
        onRefresh={refetch}
        renderForm={(onSuccess, id) => {
          const code = codes.find((b) => b.id === id);
          return <CodeForm onSuccess={onSuccess} code={code} />;
        }}
        onDelete={handleDelete}
        onEdit={() => {}}
        renderRowAction={(row: DataRow) => (
          <button
            className={c.qrButton}
            onClick={() => setQrValue(String(row.value))}>
            QR
          </button>
        )}
      />

      {qrValue && (
        <div className={c.qrBackdrop} onClick={() => setQrValue(null)}>
          <div className={c.qrModal} onClick={(e) => e.stopPropagation()}>
            <div className={c.qrHeader}>
              <h3>{qrValue}</h3>
              <button
                className={c.qrCloseButton}
                onClick={() => setQrValue(null)}>
                &times;
              </button>
            </div>
            <div ref={qrRef} className={c.qrContainer}>
              <QRCode value={qrValue} size={256} />
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
