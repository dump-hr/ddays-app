export const sendVerificationEmail = async (
  email: string,
  setEmailError: (error: string) => void,
  handleNextStep: () => void,
) => {
  try {
    const response = await fetch('/api/email/generate-reset-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

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
