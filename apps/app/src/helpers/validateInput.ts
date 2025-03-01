import { UserData, UserDataFields } from '../types/user/user.dto';

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
    //TODO ovo mora bolje, npr trenutno prolazi 976480111
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
        /(\+\d{3})(\d{2})(\d{3})(\d{3})/,
        '$1 $2 $3 $4',
      );
    } else {
      cleanPhoneNumber = cleanPhoneNumber.substring(0, 10);

      if (cleanPhoneNumber.length === 9) {
        return cleanPhoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
      } else {
        return cleanPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
      }
    }
  },
};

export const validateField = (
  name: keyof UserData,
  value: string | number | boolean | null | undefined,
  userData: Partial<UserData>,
): string | undefined => {
  switch (name) {
    case UserDataFields.FirstName:
      if (!validations.isNotEmpty(value as string))
        return 'Hej, ovo polje je obavezno';
      if (!validations.isValidName(value as string))
        return 'Hej, moraš unijeti ispravno ime';
      break;

    case UserDataFields.LastName:
      if (!validations.isNotEmpty(value as string))
        return 'Hej, ovo polje je obavezno';
      if (!validations.isValidName(value as string))
        return 'Hej, moraš unijeti ispravno prezime';
      break;

    case UserDataFields.Email:
      if (!validations.isNotEmpty(value as string))
        return 'Hej, email je obavezan';
      if (!validations.isValidEmail(value as string))
        return 'Hej, moraš unijeti ispravan email';
      break;

    case UserDataFields.Password:
      if (!validations.isNotEmpty(value as string))
        return 'Hej, lozinka je obavezna';
      if (!validations.isValidPassword(value as string))
        return 'Hej, lozinka mora imati najmanje 8 znakova i broj';
      break;

    case UserDataFields.RepeatedPassword:
      if (value !== userData.password) return 'Hej, lozinke se ne podudaraju';
      break;

    case UserDataFields.PhoneNumber:
      if (!validations.isNotEmpty(value as string))
        return 'Hej, broj telefona je obavezan';
      if (!validations.isValidPhoneNumber(value as string))
        return 'Hej, moraš unijeti ispravan broj telefona';
      break;

    case UserDataFields.BirthYear:
      if (!value) return 'Hej, godina rođenja je obavezna';
      if (!validations.isValidBirthYear(value.toString()))
        return 'Hej, moraš unijeti ispravnu godinu rođenja';
      break;

    case UserDataFields.EducationDegree:
      if (!value) return 'Hej, ovo polje je obavezno!';
      break;

    case UserDataFields.Occupation:
      if (!value) return 'Hej, ovo polje je obavezno';
      break;

    case UserDataFields.TermsAndConditionsEnabled:
      if (!value) return 'Hej, prihvaćanje uvjeta korištenja je obavezno';
      break;

    default:
      return undefined;
  }
};
