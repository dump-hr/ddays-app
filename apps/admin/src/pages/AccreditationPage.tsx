import { useGetPrintData } from '../api/printer/useGetPrintData';
import { Button } from '../components/Button';
import { SelectInput } from '../components/SelectInput';
import { useEffect, useState } from 'react';
import { printUser } from '../helpers/printUser';

const AccreditationPage = () => {
  const [printerSelected, setPrinterSelected] = useState(
    Number(localStorage.getItem('printerIdForAccreditation') || '1'),
  );
  const { data: accreditationData, refetch } = useGetPrintData(printerSelected);

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
      <div className='flex'>
        <Button
          onClick={() => {
            refetch();
          }}
          variant='primary'>
          Fetch new accreditation
        </Button>
        <Button
          onClick={() => {
            printUser(accreditationData?.user);
          }}
          variant='primary'>
          Print user
        </Button>
      </div>
      <h1>Accreditation: </h1>
      {accreditationData ? (
        <p>{accreditationData?.user.email}</p>
      ) : (
        <p>No accreditation data available</p>
      )}
    </div>
  );
};

export default AccreditationPage;
