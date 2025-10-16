import toast from 'react-hot-toast';
import { DataRow } from '../types/table';

export const exportToCSV = (rows: DataRow[], filename: string) => {
  if (rows.length === 0) {
    toast.error('Nema podataka za izvoz.');
    return;
  }

  const headers = Object.keys(rows[0]);
  const csvRows = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((field) => {
          const val = row[field] ?? '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(','),
    ),
  ];

  const blob = new Blob([csvRows.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
