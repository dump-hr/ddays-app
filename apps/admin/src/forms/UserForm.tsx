import { UserCreateForAccreditationDto } from '@ddays-app/types';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useForm } from 'react-hook-form';

import { useCreateUser } from '../api/user/useCreateUser';
import { useGetOneUser } from '../api/user/useGetOneUser';
import { useUpdateUser } from '../api/user/useUpdateUser';
import { Button } from '../components/Button';
import { InputHandler } from '../components/InputHandler';
import { Question, QuestionType } from '../types/question';

type UserFormProps = {
  id?: number;
  onSuccess: () => void;
};

export const UserForm: React.FC<UserFormProps> = ({ id, onSuccess }) => {
  const { data: user, isLoading } = useGetOneUser(id ?? 0);

  const createUser = useCreateUser();
  const updateUser = useUpdateUser(id ?? 0);

  const questions: Question[] = [
    {
      id: 'firstName',
      type: QuestionType.Field,
      title: 'Ime',
      defaultValue: user?.firstName ?? undefined,
    },
    {
      id: 'lastName',
      type: QuestionType.Field,
      title: 'Prezime',
      defaultValue: user?.lastName ?? undefined,
    },
  ];

  const form = useForm<UserCreateForAccreditationDto>({
    resolver: classValidatorResolver(UserCreateForAccreditationDto),
  });

  if (id && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {questions.map((q) => {
        return <InputHandler question={q} form={form} key={q.id} />;
      })}

      <Button
        onClick={form.handleSubmit(async (formData) => {
          onSuccess();
          if (id) {
            updateUser.mutate(formData);
          } else {
            createUser.mutate(formData);
          }
        })}>
        Submit
      </Button>
    </>
  );
};
