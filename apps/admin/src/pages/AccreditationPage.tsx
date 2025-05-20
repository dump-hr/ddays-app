import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { useGetAllPrinters } from '../api/printer/useGetAllPrinters';
import { useGetPrintData } from '../api/printer/useGetPrintData';
import { useGetAllUsers } from '../api/user/useGetAllUsers';

import { Button } from '../components/Button';
import { SelectInput } from '../components/SelectInput';
import { printUser } from '../helpers/printUser';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { UserForm } from '../forms/UserForm';

const AccreditationPage = () => {
  const [printerSelected, setPrinterSelected] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEditId, setUserToEditId] = useState<number>();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: printers } = useGetAllPrinters();
  const { data: users } = useGetAllUsers();
  const { data: accreditationData, refetch } = useGetPrintData(
    Number(printerSelected),
  );

  const printersDropdownData = useMemo(
    () => printers?.map((printer) => `${printer.id} - ${printer.name}`),
    [printers],
  );

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    const searchLower = searchTerm.toLowerCase();
    if (!searchLower) {
      return users.slice(0, 100);
    }
    return users
      .filter(
        (user) =>
          user.firstName?.toLowerCase().includes(searchLower) ||
          false ||
          user.lastName?.toLowerCase().includes(searchLower) ||
          false,
      )
      .slice(0, 100); // Limit to 100 results
  }, [users, searchTerm]);

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
            toast.success('Accreditation scan data refreshed');
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
              toast.error('No scanned accreditation data available');
              return;
            }
            printUser(accreditationData?.user);
          }}
          variant='primary'>
          Print user
        </Button>
      </div>

      <div className='flex sectionGap flexBetween'>
        <Button variant='primary' onClick={() => setIsModalOpen(true)}>
          New user
        </Button>

        <div>
          <input
            type='text'
            placeholder='Search by name...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='searchInput'
          />
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <small>
          Showing {filteredUsers.length}{' '}
          {filteredUsers.length === 100 ? 'first' : ''} users
          {searchTerm && ` for "${searchTerm}"`}
        </small>
      </div>

      <Table
        data={filteredUsers}
        actions={[
          {
            label: 'Print',
            action: (user) => {
              if (!printerSelected) {
                toast.error('Please select a printer first!');
                return;
              }
              printUser(user);
            },
          },
          {
            label: 'Uredi',
            action: (user) => {
              setIsModalOpen(true);
              setUserToEditId(user.id);
            },
          },
        ]}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUserToEditId(undefined);
        }}>
        <UserForm
          id={userToEditId}
          onSuccess={() => {
            setIsModalOpen(false);
            setUserToEditId(undefined);
          }}
        />
      </Modal>
    </div>
  );
};

export default AccreditationPage;
