import { useGetPrintData } from '../api/printer/useGetPrintData';
import { Button } from '../components/Button';
import { SelectInput } from '../components/SelectInput';
import { useEffect, useState } from 'react';
import { printUser } from '../helpers/printUser';
import toast from 'react-hot-toast';

const AccreditationPage = () => {
  const [printerSelected, setPrinterSelected] = useState(
    Number(localStorage.getItem('printerIdForAccreditation') || ''),
  );
  const { data: accreditationData, refetch } = useGetPrintData(printerSelected);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    if (printerSelected) {
      refetch();
    }
  }, [printerSelected]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrinterSelected(Number(e.target.value));
    localStorage.setItem('printerIdForAccreditation', e.target.value);
  };

  return (
    <div>
      <p>Printer selected:</p>
      <SelectInput
        options={['1', '2']}
        onChange={handleSelectChange}
        isAllowedEmpty={true}
        defaultValue={String(printerSelected)}
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
            setHasRefreshed(true);
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

            if (!hasRefreshed) {
              toast.error('Please refresh the accreditation data first');
              return;
            }
            setHasRefreshed(false);
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
