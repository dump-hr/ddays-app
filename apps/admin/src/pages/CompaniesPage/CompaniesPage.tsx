import { QuestionType, SponsorCategory } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useCreateCompany } from '../../api/Companies/useCreateCompany';
import { useDeleteCompany } from '../../api/Companies/useDeleteCompany';
import { useFetchCompanies } from '../../api/Companies/useFetchCompanies';
import { useUpdateCompany } from '../../api/Companies/useUpdateComapny';
import { CompanyDto, UpdateCompanyDto } from '../../types/company';

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
  const [companyToEdit, setCompanyToEdit] = useState<CompanyDto | null>(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [companyToDeleteId, setCompanyToDeleteId] = useState<number | null>(
    null,
  );

  const { data: companies, isLoading } = useFetchCompanies();
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

  const handleEditCompany = (data: CompanyDto) => {
    editCompany({
      id: companyToEdit?.id as number,
      company: data,
    });
    if (!editCompanyForm.formState.isValid) {
      setIsOpenEditModal(!isOpenEditModal);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (companyToEdit) {
      editCompanyForm.reset({
        name: companyToEdit.name,
        description: companyToEdit.description,
        websiteUrl: companyToEdit.url,
        email: companyToEdit.email,
        boothLocation: companyToEdit.boothLocation,
        codeId: companyToEdit.,
        sponsorCategory: companyToEdit.sponsorCategory,
      });
    }
  }, [companyToEdit]);
  return <div></div>;
};
