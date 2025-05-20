import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { useGetAllPrinters } from '../api/printer/useGetAllPrinters';
import { useGetPrintData } from '../api/printer/useGetPrintData';
import { Button } from '../components/Button';
import { SelectInput } from '../components/SelectInput';
import { printUser } from '../helpers/printUser';

const AccreditationPage = () => {
  const [printerSelected, setPrinterSelected] = useState('');

  const { data: printers } = useGetAllPrinters();
  const { data: accreditationData, refetch } = useGetPrintData(
    Number(printerSelected),
  );

  const printersDropdownData = useMemo(
    () => printers?.map((printer) => `${printer.id} - ${printer.name}`),
    [printers],
  );

  useEffect(() => {
    if (printerSelected) {
      refetch();
    }
  }, [printerSelected, refetch]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrinterSelected(e.target.value.split(' - ')[0]);
  };

  return (
    <div>
      <p>Printer selected: {printerSelected}</p>
      <SelectInput
        options={printersDropdownData || []}
        onChange={handleSelectChange}
        isAllowedEmpty={true}
        defaultValue={printerSelected}
      />
      <h1>
        <strong>Accreditation: </strong>
      </h1>
      {accreditationData ? (
        <>
          <p>
            {' '}
            <strong>Email:</strong> {accreditationData?.user.email}
          </p>
          <p>
            <strong>Name:</strong> {accreditationData?.user.firstName}{' '}
            {accreditationData?.user.lastName}{' '}
          </p>
        </>
      ) : (
        <p>No accreditation data available</p>
      )}
      <div className='flex'>
        <Button
          onClick={() => {
            if (!printerSelected) {
              toast.error('Please select a printer first!');
              return;
            }
            refetch();
            toast.success('Accreditation data refreshed');
          }}
          variant='primary'>
          Refresh current accreditation
        </Button>
        <Button
          onClick={() => {
            if (!printerSelected) {
              toast.error('Please select a printer first!');
              return;
            }

            if (!accreditationData) {
              toast.error('No accreditation data available');
              return;
            }
            printUser(accreditationData?.user);
          }}
          variant='primary'>
          Print user
        </Button>
      </div>
    </div>
  );
};

export default AccreditationPage;
