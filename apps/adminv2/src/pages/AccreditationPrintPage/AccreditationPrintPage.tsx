import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { useGetAllPrinters } from '../../api/printer/useGetAllPrinters';
import { useGetPrintData } from '../../api/printer/useGetPrintData';
import { useGetAllUsers } from '../../api/user/useGetAllUsers';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { SelectInput } from '../../components/SelectInput';
import { TableDashboard } from '../../components/TableDashboard';
import { UserForm } from '../../forms/UserForm';
import { printUser } from '../../helpers/printUser';

import c from './AccreditationPrintPage.module.scss';

export const AccreditationPrintPage = () => {
  const [printerSelected, setPrinterSelected] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEditId, setUserToEditId] = useState<number>();
  const searchTerm = '';

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
          user.lastName?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower) ||
          (
            user.firstName?.toLowerCase() +
            ' ' +
            user.lastName?.toLowerCase()
          ).includes(searchLower),
      )
      .slice(0, 100);
  }, [users, searchTerm]);

  useEffect(() => {
    if (printerSelected) {
      refetch();
    }
  }, [printerSelected, refetch]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrinterSelected(e.target.value.split(' - ')[0]);
  };

  const handleSelectionChange = (ids: number[]) => {
    if (ids.length > 1) {
      const lastSelected = ids[ids.length - 1];
      const user = filteredUsers.find((u) => u.id === lastSelected);
      setSelectedUser(user || null);
    } else {
      const user = filteredUsers.find((u) => u.id === ids[0]);
      setSelectedUser(user || null);
    }
  };

  return (
    <div>
      <div className={c.printerSelect}>
        <p>Printer selected: {printerSelected}</p>
        <SelectInput
          options={printersDropdownData || []}
          onChange={handleSelectChange}
          isAllowedEmpty={true}
          defaultValue={printerSelected}
          style={{ width: '420px' }}
        />
      </div>
      <h1 className={c.controlsHeader}>
        <strong>Accreditation: </strong>
      </h1>
      <div className={c.accreditationData}>
        {selectedUser ? (
          <>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.firstName}{' '}
              {selectedUser.lastName}
            </p>
          </>
        ) : accreditationData ? (
          <>
            <p>
              <strong>Email:</strong> {accreditationData?.user.email}
            </p>
            <p>
              <strong>Name:</strong> {accreditationData?.user.firstName}{' '}
              {accreditationData?.user.lastName}
            </p>
          </>
        ) : (
          <p className={c.noData}>No accreditation data available</p>
        )}
      </div>

      <div className={c.controls}>
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

            const userToPrint = selectedUser || accreditationData?.user;

            if (!userToPrint) {
              toast.error('No user selected or scanned data available');
              return;
            }

            printUser(userToPrint);
          }}
          variant='primary'>
          Print user
        </Button>
      </div>

      <TableDashboard
        data={filteredUsers}
        dataType='Users'
        onRefresh={() => refetch()}
        renderForm={(onSuccess, id) => (
          <UserForm id={id} onSuccess={onSuccess} />
        )}
        onEdit={(ids) => {
          setUserToEditId(ids[0]);
          setIsModalOpen(true);
        }}
        onSelectionChange={handleSelectionChange}
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
