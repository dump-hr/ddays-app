import { Question, QuestionType } from '@ddays-app/types';
import { isBefore } from 'date-fns';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

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

const headers = [
  'Broj',
  'Naslov',
  'Content',
  'Aktiviran prije',
  'Status',
  'Akcije',
];

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
  {
    type: QuestionType.Checkbox,
    title: 'Aktivan',
    id: 'isActive',
    defaultValue: false,
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
  const { mutate: deleteNotification } = useDeleteNotification();

  const form = useForm<FieldValues>();

  const buttonActions = [
    {
      label: 'Uredi',
      action: (notification: NotificationDto) => {
        setSelectedNotification(notification);
        setIsOpenUpdateModal(true);
      },
    },
    {
      label: 'Obriši',
      action: ({ id }: NotificationDto) => {
        deleteNotification(id);
      },
    },
    {
      label: 'Aktiviraj',
      action: (row: object) => {
        console.log('Aktiviraj', row); //todo
      },
    },
  ];

  useEffect(() => {
    form.reset({
      title: selectedNotification?.title,
      content: selectedNotification?.content,
      isActive: selectedNotification?.isActive,
    });
  }, [form, selectedNotification, isOpenUpdate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Notifications Page</h1>
      <Button onClick={() => setIsOpenCreateModal(true)}>+Add new notif</Button>

      <Modal
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
        headers={headers}
        data={notifications
          ?.sort((a, b) => a.id - b.id)
          .map((n) => ({
            ...n,
            isActive: isBefore(n.activatedAt, new Date())
              ? 'Aktivan'
              : 'Neaktivan',
          }))}
        buttonActions={buttonActions}
      />
    </div>
  );
};

export default NotificationsPage;
