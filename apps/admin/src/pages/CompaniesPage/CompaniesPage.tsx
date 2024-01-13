import { Question, QuestionType, SponsorCategory } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useCreateCompany } from '../../api/Companies/useCreateCompany';
import { useDeleteCompany } from '../../api/Companies/useDeleteCompany';
import { useFetchCompanies } from '../../api/Companies/useFetchCompanies';
import { useUpdateCompany } from '../../api/Companies/useUpdateComapny';
import { useFetchCompanyInterests } from '../../api/Interests/useFetchCompanyInterests';
import { useFetchInterests } from '../../api/Interests/useFetchInterests';
import Button from '../../components/Button';
import InputHandler from '../../components/InputHandler';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import {
  CompanyDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from '../../types/company';

const headers = [
  'Broj',
  'Ime',
  'Kategorija sponzorstva',
  'Lokacija štanda',
  'CodeId',
  'Akcije',
];

const questions: Question[] = [
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
  },
  {
    id: 'websiteUrl',
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
  const [companyToEditId, setCompanyToEditId] = useState<number>();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [companyToDeleteId, setCompanyToDeleteId] = useState<number | null>(
    null,
  );
  const [fields, setFields] = useState(questions);

  const { data: companies } = useFetchCompanies();
  const { data: interestsForCompany } =
    useFetchCompanyInterests(companyToEditId);

  const { data: interests } = useFetchInterests();

  const { mutateAsync: createCompany } = useCreateCompany();
  const { mutateAsync: editCompany } = useUpdateCompany();
  const { mutateAsync: deleteCompany } = useDeleteCompany();

  useEffect(() => {
    if (!interests) return;
    const interestsOptions = interests?.map((interest) => ({
      label: interest.name,
      value: interest.id,
    }));

    const newQuesiton: Question = {
      id: 'interests',
      type: QuestionType.MultipleSelect,
      title: 'Interesi',
      options: interestsOptions,
    };

    setFields([...questions, newQuesiton]);
  }, [interests]);

  const createCompanyForm = useForm<FieldValues>();
  const editCompanyForm = useForm<FieldValues>();

  const buttonActions = [
    {
      label: 'Uredi',
      action: (row: CompanyDto) => {
        setCompanyToEditId(row.id);
        setIsOpenEditModal((prev) => !prev);
      },
    },
    {
      label: 'Obriši',
      action: (row: CompanyDto) => {
        setIsOpenDeleteModal((prev) => !prev);
        setCompanyToDeleteId(row.id);
      },
    },
  ];

  const handleCreateCompany = (data: CreateCompanyDto) => {
    createCompany(data).then(() => {
      setIsOpenAddModal((prev) => !prev);
      createCompanyForm.reset();
    });
  };

  const handleEditCompany = (data: UpdateCompanyDto) => {
    if (!companyToEditId) return;

    editCompany({
      id: companyToEditId as number,
      company: data,
    }).then(() => {
      setIsOpenEditModal((prev) => !prev);
      editCompanyForm.reset();
    });
  };

  useEffect(() => {
    if (!companyToEditId) return;

    const companyToEdit = companies?.find(
      (company) => company.id === companyToEditId,
    );

    editCompanyForm.reset({
      name: companyToEdit?.name,
      description: companyToEdit?.description,
      websiteUrl: companyToEdit?.url,
      email: companyToEdit?.email,
      boothLocation: companyToEdit?.boothLocation,
      codeId: companyToEdit?.codeId,
      sponsorCategory: companyToEdit?.sponsorCategory,
      interests: interestsForCompany?.map((interest) => interest.id),
    });
  }, [companyToEditId, interestsForCompany]);

  return (
    <>
      <Modal
        isOpen={isOpenAddModal}
        toggleModal={() => {
          setIsOpenAddModal((prev) => !prev);
        }}>
        <Button
          onClick={createCompanyForm.handleSubmit((s) =>
            handleCreateCompany(s as CreateCompanyDto),
          )}>
          Submit
        </Button>
        {fields.map((q) => (
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
        {fields.map((q) => (
          <InputHandler question={q} form={editCompanyForm} key={q.id} />
        ))}
      </Modal>

      <Modal
        isOpen={isOpenDeleteModal}
        toggleModal={() => {
          setIsOpenDeleteModal(!isOpenDeleteModal);
        }}>
        <div style={{ display: 'flex' }}>
          <p>Jeste li sigurni da želite izbrisati ovu kompaniju?</p>
          <Button
            onClick={() => {
              deleteCompany(companyToDeleteId as number).then(() => {
                setIsOpenDeleteModal((prev) => !prev);
              });
            }}>
            Delete
          </Button>
        </div>
      </Modal>

      <Button
        variant='primary'
        onClick={() => {
          setIsOpenAddModal((prev) => !prev);
        }}>
        Dodaj novu kompaniju
      </Button>

      <Table
        headers={headers}
        data={
          companies
            ?.sort((a, b) => a.id - b.id)
            .map((c) => ({
              id: c.id,
              name: c.name,
              sponsorCategory: c.sponsorCategory,
              boothLocation: c.boothLocation,
              codeId: c.codeId,
            })) as CompanyDto[]
        }
        buttonActions={buttonActions}
      />
    </>
  );
};
