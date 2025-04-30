import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import axios from '../base';

type EmailToSend = {
  email: string;
  text: string;
  subject: string;
};

const sendEmail = async (request: EmailToSend) => {
  try {
    const response = await axios.post('/email/send', request);
    return response;
  } catch (error: any) {
    console.error('Greška pri slanju emaila:', error);
    throw error;
  }
};

export const useSendEmail = () => {
  return useMutation(sendEmail, {
    onSuccess: () => {
      toast.success('Email poslan');
    },
    onError: (error: any) => {
      const errorMessage = error?.message || 'Greška pri slanju emaila';
      console.error('Detalji greške:', error);
      toast.error(errorMessage);
    },
  });
};
