import {
  AchievementCreateReqDto,
  Question,
  QuestionType,
} from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useAchievementGetAll } from '../../api/achievement/useAchievementGetAll';
import { Button } from '../../components/Button';
import InputHandler from '../../components/InputHandler';
import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';

const questions: Question[] = [
  {
    id: 'name',
    type: QuestionType.Field,
    title: 'Ime',
    rules: { required: 'Obavezno polje' },
  },
];

export const AchievementsPage = () => {
  const { data, isError, isLoading } = useAchievementGetAll();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const createAchievementForm = useForm<FieldValues>({
    resolver: classValidatorResolver(AchievementCreateReqDto),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Pogreška pri fetchanju podataka. Pogledaj konzolu.</div>;
  }

  return (
    <>
      <Modal
        isOpen={isOpenAddModal}
        toggleModal={() => setIsOpenAddModal((prev) => !prev)}>
        {questions.map((q) => (
          <InputHandler question={q} form={createAchievementForm} key={q.id} />
        ))}
        <Button
          onClick={createAchievementForm.handleSubmit((s) => console.log(s))}>
          Submit
        </Button>
      </Modal>

      <Button
        variant='primary'
        onClick={() => {
          setIsOpenAddModal((prev) => !prev);
        }}>
        Dodaj novu kompaniju
      </Button>

      <Table
        data={data}
        actions={[
          {
            label: 'test',
            action: (row) => console.log(row),
          },
          {
            label: 'test',
            action: (row) => console.log(row),
          },
        ]}
      />
    </>
  );
};
