import { Question, QuestionType } from '@ddays-app/types';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useActivateNotification } from '../../api/useActivateNotification';
import { useCreateNotification } from '../../api/useCreateNotification';
import { useDeleteNotification } from '../../api/useDeleteNotification';
import { useFetchNotifications } from '../../api/useFetchNotifications';
import { useUpdateNotification } from '../../api/useUpdateNotification';
import Button from '../../components/Button';
import InputHandler from '../../components/InputHandler';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import {
  CreateNotificationDto,
  NotificationDto,
  UpdateNotificationDto,
} from '../../types/notification';

const headers = ['Broj', 'Naslov', 'Content', 'Aktivan od', 'Akcije'];

const questions: Question[] = [
  {
    type: QuestionType.Field,
    title: 'Naslov',
    id: 'title',
    rules: {
      required: 'Obavezno!',
    },
  },
  {
    type: QuestionType.Field,
    title: 'Content',
    id: 'content',
    rules: {
      required: 'Obavezno!',
    },
  },
];

const NotificationsPage = () => {
  const [isOpenCreate, setIsOpenCreateModal] = useState(false);
  const [isOpenUpdate, setIsOpenUpdateModal] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationDto>();

  const { data: notifications, isLoading } = useFetchNotifications();
  const { mutate: createNotification } = useCreateNotification();
  const { mutate: updateNotification } = useUpdateNotification();
  const { mutate: activateNotification } = useActivateNotification();
  const { mutate: deleteNotification } = useDeleteNotification();

  const form = useForm<FieldValues>();

  useEffect(() => {
    form.reset({
      title: selectedNotification?.title,
      content: selectedNotification?.content,
    });
  }, [form, selectedNotification, isOpenUpdate]);

  useEffect(() => {
    form.reset();
  }, [form, form.formState.isSubmitSuccessful]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Notifications Page</h1>
      <Button onClick={() => setIsOpenCreateModal(true)}>+Add new notif</Button>

      <Modal
        showCloseButton
        isOpen={isOpenCreate}
        toggleModal={() => setIsOpenCreateModal(!isOpenCreate)}>
        {questions.map((q) => (
          <InputHandler question={q} form={form} key={q.id} />
        ))}
        <Button
          onClick={form.handleSubmit((s) => {
            createNotification(s as CreateNotificationDto);
            setIsOpenCreateModal(false);
          })}>
          +Create
        </Button>
      </Modal>

      <Modal
        showCloseButton
        isOpen={isOpenUpdate}
        toggleModal={() => {
          setIsOpenUpdateModal(!isOpenUpdate);
        }}>
        {questions.map((q) => (
          <InputHandler question={q} form={form} key={q.id} />
        ))}
        <Button
          onClick={form.handleSubmit((notification) => {
            if (!selectedNotification) return;

            updateNotification({
              id: selectedNotification.id,
              notification: notification as UpdateNotificationDto,
            });

            setIsOpenUpdateModal(false);
          })}>
          Save
        </Button>
      </Modal>

      <Table
        data={notifications?.sort((a, b) => a.id - b.id)}
        actions={[
          {
            label: 'Uredi',
            action: (notification) => {
              setSelectedNotification(notification);
              setIsOpenUpdateModal(true);
            },
          },
          {
            label: 'Obriši',
            action: ({ id }) => {
              deleteNotification(id);
            },
          },
          {
            label: ({ activatedAt }) => (activatedAt ? 'Aktivan' : 'Aktiviraj'),
            action: ({ id }) => {
              activateNotification(id);
            },
            isDisabled: ({ activatedAt }) => !!activatedAt,
          },
        ]}
      />
    </div>
  );
};

export default NotificationsPage;
