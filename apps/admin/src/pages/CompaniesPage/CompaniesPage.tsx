import { QuestionType, SponsorCategory } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useCreateCompany } from '../../api/Companies/useCreateCompany';
import { useDeleteCompany } from '../../api/Companies/useDeleteCompany';
import { useFetchCompanies } from '../../api/Companies/useFetchCompanies';
import { useFetchCompany } from '../../api/Companies/useFetchCompany';
import { useUpdateCompany } from '../../api/Companies/useUpdateComapny';
import Button from '../../components/Button';
import InputHandler from '../../components/InputHandler';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import {
  CompanyDetailsDto,
  CompanyDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from '../../types/company';

const headers = [
  'Ime',
  'Opis',
  'Website',
  'Email',
  'Lokacija štanda',
  'Kod',
  'Kategorija sponzorstva',
  'Akcije',
];

const questions = [
  {
    id: 'name',
    type: QuestionType.Field,
    title: 'Ime',
    rules: { required: 'Obavezno polje' },
  },
  {
    id: 'description',
    type: QuestionType.TextArea,
    title: 'Opis',
    rules: { required: 'Obavezno polje' },
  },
  {
    id: 'website',
    type: QuestionType.Field,
    title: 'Website',
  },
  {
    id: 'email',
    type: QuestionType.Field,
    title: 'Email',
    rules: { required: 'Obavezno polje' },
  },
  {
    id: 'boothLocation',
    type: QuestionType.Field,
    title: 'Lokacija štanda',
  },
  {
    id: 'codeId',
    type: QuestionType.Field,
    title: 'Kod', //TODO: ovo ce bit select nakon sto se napravi kodovi endpoint
  },
  {
    id: 'sponsorCategory',
    type: QuestionType.Select,
    title: 'Kategorija sponzorstva',
    options: [
      SponsorCategory.Bronze,
      SponsorCategory.Gold,
      SponsorCategory.Silver,
      SponsorCategory.FoodAndBeverage, //If more are needed just add them
    ],
  },
];

export const CompaniesPage = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [companyToEditId, setCompanyToEdit] = useState<number>(0);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [companyToDeleteId, setCompanyToDeleteId] = useState<number | null>(
    null,
  );

  const { data: companies, isLoading } = useFetchCompanies();
  const { data: companyToEdit, isLoadingOne } =
    useFetchCompany(companyToEditId);
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: editCompany } = useUpdateCompany();
  const { mutate: deleteCompany } = useDeleteCompany();

  const createCompanyForm = useForm<FieldValues>();
  const editCompanyForm = useForm<FieldValues>();

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: CompanyDto) => {
        setCompanyToEdit(row);
        setIsOpenEditModal(!isOpenEditModal);
      },
    },
    {
      label: 'Obriši',
      action: (row: CompanyDto) => {
        setIsOpenDeleteModal(!isOpenDeleteModal);
        setCompanyToDeleteId(row.id);
      },
    },
  ];

  const handleCreateCompany = (data: CreateCompanyDto) => {
    createCompany(data);
    if (!createCompanyForm.formState.isValid) {
      setIsOpenAddModal(!isOpenAddModal);
      createCompanyForm.reset();
    }
  };

  const handleEditCompany = (data: UpdateCompanyDto) => {
    editCompany({
      id: companyToEdit?.id as number,
      company: data,
    });
    if (!editCompanyForm.formState.isValid) {
      setIsOpenEditModal(!isOpenEditModal);
    }
  };

  useEffect(() => {
    if (companyToEdit) {
      editCompanyForm.reset({
        name: companyToEdit.name,
        description: companyToEdit.description,
        websiteUrl: companyToEdit.url,
        email: companyToEdit.email,
        boothLocation: companyToEdit.boothLocation,
        codeId: companyToEdit.codeId,
        sponsorCategory: companyToEdit.sponsorCategory,
      });
    }
  }, [companyToEditId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        isOpen={isOpenAddModal}
        toggleModal={() => {
          setIsOpenAddModal(!isOpenAddModal);
        }}>
        <Button
          onClick={createCompanyForm.handleSubmit((s) =>
            handleCreateCompany(s as CreateCompanyDto),
          )}>
          Submit
        </Button>
        {questions.map((q) => (
          <InputHandler question={q} form={createCompanyForm} key={q.id} />
        ))}
      </Modal>

      <Modal
        isOpen={isOpenEditModal}
        toggleModal={() => {
          setIsOpenEditModal(!isOpenEditModal);
        }}>
        <Button
          onClick={editCompanyForm.handleSubmit((s) => {
            handleEditCompany(s as UpdateCompanyDto);
          })}>
          Submit
        </Button>
        {questions.map((q) => (
          <InputHandler question={q} form={editCompanyForm} key={q.id} />
        ))}
      </Modal>

      <Modal
        isOpen={isOpenDeleteModal}
        toggleModal={() => {
          setIsOpenDeleteModal(!isOpenDeleteModal);
        }}>
        <div style={{ display: 'flex' }}>
          <p>Are you sure you want to delete this question?</p>
          <Button
            onClick={() => {
              deleteCompany(questionToDeleteId as number);
              setIsOpenDeleteModal(!isOpenDeleteModal);
            }}>
            Delete
          </Button>
        </div>
      </Modal>

      <Button
        variant='primary'
        onClick={() => {
          setIsOpenAddModal(!isOpenAddModal);
        }}>
        Dodaj novo pitanje
      </Button>
      <Table headers={headers} data={companies} buttonActions={buttonActions} />
    </>
  );
};
