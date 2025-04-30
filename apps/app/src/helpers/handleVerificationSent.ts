type SendEmailFn = (
  params: {
    email: string;
    subject: string;
    text: string;
  },
  callbacks: {
    onSuccess: () => void;
  },
) => void;

export const sendVerificationEmail = async (
  email: string,
  setEmailError: (error: string) => void,
  handleNextStep: () => void,
  sendEmail: SendEmailFn,
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

    if (data.error) {
      setEmailError('Korisnik s ovom email adresom ne postoji.');
      return;
    }

    if (data.token) {
      const appUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:3005'
          : 'https://days.dump.hr';

      sendEmail(
        {
          email,
          subject: 'DDays 2025 - Resetiranje lozinke',
          text: `Pozdrav, klikni na link ispod da resetiraš lozinku: ${appUrl}/app/password-reset/${data.token}`,
        },
        {
          onSuccess: () => {
            handleNextStep();
          },
        },
      );
    }
  } catch (error) {
    console.error('Greška pri generiranju tokena:', error);
    alert('Došlo je do greške pri generiranju tokena');
  }
};
