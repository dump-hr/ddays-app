import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import axios from '../base';
import { AxiosError } from 'axios';

type ErrorResponse = {
  message: string;
};

type EmailToSend = {
  email: string;
  text: string;
  subject: string;
};

const sendEmail = async (request: EmailToSend) => {
  try {
    const response = await axios.post('/email/send', request);
    return response;
  } catch (error: unknown) {
    console.error('Greška pri slanju emaila:', error);
    throw error;
  }
};

export const useSendEmail = () => {
  return useMutation(sendEmail, {
    onSuccess: () => {
      toast.success('Email poslan');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error?.response?.data?.message || 'Greška pri slanju emaila';
      console.error('Detalji greške:', error);
      toast.error(errorMessage);
    },
  });
};
