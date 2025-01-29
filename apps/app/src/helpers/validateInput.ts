import { UserData } from '../types/user/user.dto';

export const validations = {
  isNotEmpty: (value: string) => value.trim().length > 0,

  isValidName: (value: string) => {
    const nameRegex = /^[a-zA-ZčćđšžČĆĐŠŽ\s]{2,}$/;
    return nameRegex.test(value.trim());
  },

  isValidEmail: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  },

  isValidPassword: (value: string) => {
    return value.length >= 8 && /\d/.test(value);
  },

  isValidPhoneNumber: (value: string): boolean => {
    const cleanNumber = value.replace(/\s/g, '');
    const phoneRegex = /^(?:\+?\d{11,13}|\d{9,10})$/;
    return phoneRegex.test(cleanNumber);
  },

  isValidBirthYear: (value: string) => {
    const yearRegex = /^\d{4}$/;
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    return yearRegex.test(value) && year >= 1900 && year <= currentYear;
  },

  formatPhoneNumber: (value: string) => {
    let cleanPhoneNumber = value.replace(/[^\d+]/g, '');

    if (cleanPhoneNumber.startsWith('+')) {
      cleanPhoneNumber = cleanPhoneNumber.substring(0, 13);
      return cleanPhoneNumber.replace(
        /(\+\d{3})(\d{2})(\d{3})(\d{4})/,
        '$1 $2 $3 $4',
      );
    } else {
      cleanPhoneNumber = cleanPhoneNumber.substring(0, 10);
      return cleanPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    }
  },
};

export const validateField = (
  name: keyof UserData,
  value: any,
  userData: Partial<UserData>,
): string | undefined => {
  switch (name) {
    case 'firstName':
      if (!validations.isNotEmpty(value)) return 'Ovo polje je obavezno';
      if (!validations.isValidName(value)) return 'Unesite ispravno ime';
      break;

    case 'lastName':
      if (!validations.isNotEmpty(value)) return 'Ovo polje je obavezno';
      if (!validations.isValidName(value)) return 'Unesite ispravno prezime';
      break;

    case 'email':
      if (!validations.isNotEmpty(value)) return 'Email je obavezan';
      if (!validations.isValidEmail(value)) return 'Unesite ispravan email';
      break;

    case 'password':
      if (!validations.isNotEmpty(value)) return 'Lozinka je obavezna';
      if (!validations.isValidPassword(value))
        return 'Lozinka mora imati najmanje 8 znakova i broj';
      break;

    case 'repeatedPassword':
      if (value !== userData.password) return 'Lozinke se ne podudaraju';
      break;

    case 'phoneNumber':
      if (!validations.isNotEmpty(value)) return 'Broj telefona je obavezan';
      if (!validations.isValidPhoneNumber(value))
        return 'Unesite ispravan broj telefona';
      break;

    case 'birthYear':
      if (!value) return 'Godina rođenja je obavezna';
      if (!validations.isValidBirthYear(value.toString()))
        return 'Unesite ispravnu godinu rođenja';
      break;

    case 'educationDegree':
      if (!value) return 'Ovo polje je obavezno!';
      break;

    case 'occupation':
      if (!value) return 'Ovo polje je obavezno';
      break;

    case 'termsAndConditionsEnabled':
      if (!value) return 'Morate prihvatiti uvjete korištenja';
      break;

    default:
      return undefined;
  }
};
