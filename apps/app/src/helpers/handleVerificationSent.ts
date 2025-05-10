import axios from 'axios';

export const sendVerificationEmail = async (
  email: string,
  setEmailError: (error: string) => void,
  handleNextStep: () => void,
) => {
  try {
    const { data } = await axios.post('/api/email/generate-reset-token', {
      email,
    });

    if (!data.success) {
      setEmailError(data.message || 'Došlo je do greške pri slanju emaila');
      return;
    }

    handleNextStep();
  } catch (error) {
    console.error('Greška pri generiranju tokena:', error);
    setEmailError('Došlo je do greške pri slanju emaila');
  }
};
