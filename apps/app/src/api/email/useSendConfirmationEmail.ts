import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useSendConfirmationEmail = () => {
  return useMutation(
    async (email: string) => {
      const response = await axios.post('/api/email/send-confirmation', {
        email,
      });
      return response; // Ensure it matches the shape of the data returned by your controller
    },
    {
      onSuccess: () => {
        toast.success('Email poslan!');
      },
      onError: (error: AxiosError) => {
        const errorMessage = error.message || 'Greška pri slanju emaila';
        console.error('Detalji greške:', error);
        toast.error(errorMessage);
      },
    },
  );
};
