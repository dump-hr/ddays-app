import { useState } from 'react';

import { useCompanyGetAllPublic } from '../api/company/useCompanyGetAllPublic';
import { useCompanyRemove } from '../api/company/useCompanyRemove';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Table } from '../components/Table';
import { CompanyForm } from '../forms/CompanyForm';

export const CompanyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyToEditId, setCompanyToEditId] = useState<number>();

  const companies = useCompanyGetAllPublic();

  const removeCompany = useCompanyRemove();

  if (companies.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCompanyToEditId(undefined);
        }}>
        <CompanyForm
          id={companyToEditId}
          onSuccess={() => {
            setIsModalOpen(false);
            setCompanyToEditId(undefined);
          }}
        />
      </Modal>

      <Button variant='primary' onClick={() => setIsModalOpen(true)}>
        New
      </Button>

      <Table
        data={companies.data}
        actions={[
          {
            label: 'Uredi',
            action: (company) => {
              setCompanyToEditId(company.id);
              setIsModalOpen(true);
            },
          },
          {
            label: 'Obriši',
            action: (company) => {
              if (confirm('Are you sure?')) {
                removeCompany.mutateAsync(company.id);
              }
            },
          },
        ]}
      />
    </>
  );
};
