import { FlyTalksRegistrationDataFields, UserDataFields } from '@/types/enums';
import { FlyTalksRegistrationDto, RegistrationDto } from '@/types/user/user';

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

  isWordCountValid: (value: string, maxWords: number) => {
    const wordCount = value.trim().split(/\s+/).filter((word) => word.length > 0)
      .length;
    return wordCount >= maxWords;
  },

  isValidPhoneNumber: (value: string): boolean => {
    const cleanNumber = value.replace(/\s/g, '');

    if (cleanNumber.startsWith('+')) {
      return /^\+\d{11,13}$/.test(cleanNumber);
    }
    return /^0\d{8,9}$/.test(cleanNumber);
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

  isValidURL: (value: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(value.trim());
  }
};

export const validateField = (
  name: keyof RegistrationDto,
  value: string | number | boolean | null | undefined,
  userData: Partial<RegistrationDto>,
): string | undefined => {
  const isNotEmptyNewPass = validations.isNotEmpty(
    userData.newPassword as string,
  );
  const passField = isNotEmptyNewPass ? 'newPassword' : 'password';

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

    case UserDataFields.NewPassword:
      if (!validations.isNotEmpty(value as string))
        return 'Hej, nova lozinka je obavezna';
      if (!validations.isValidPassword(value as string))
        return 'Hej, nova lozinka mora imati najmanje 8 znakova i broj';
      break;

    case UserDataFields.RepeatedPassword:
      if (!validations.isNotEmpty(value as string))
        return 'Hej, potvrda lozinke je obavezna';
      if (value !== userData[passField]) return 'Hej, lozinke se ne podudaraju';
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

export const allFieldsAreFilled = (
  fields: (keyof RegistrationDto)[],
  userData: Partial<RegistrationDto>,
) => {
  return fields.every((key) => userData[key] !== null && userData[key] !== '');
};

export const validateFlyTalksInput = (
  fields: (keyof FlyTalksRegistrationDto)[],
  userData: Partial<FlyTalksRegistrationDto>,
): string | undefined => {
  for (const field of fields) {
    switch (field) {
      case FlyTalksRegistrationDataFields.LinkedIn:
        if (!validations.isNotEmpty(userData.linkedIn as string))
          return 'Hej, ovo polje je obavezno';
        if (!validations.isValidURL(userData.linkedIn as string))
          return 'Hej, moraš unijeti ispravan LinkedIn link';
        break;

      case FlyTalksRegistrationDataFields.GitHub:
        if (!validations.isNotEmpty(userData.github as string))
          return 'Hej, ovo polje je obavezno';
        if (!validations.isValidURL(userData.github as string))
          return 'Hej, moraš unijeti ispravan GitHub link';
        break;

      case FlyTalksRegistrationDataFields.Portfolio:
        if (!validations.isNotEmpty(userData.portfolio as string))
          return 'Hej, ovo polje je obavezno';
        if (!validations.isValidURL(userData.portfolio as string))
          return 'Hej, moraš unijeti ispravan portfolio link';
        break;

      case FlyTalksRegistrationDataFields.About:
        if (!validations.isNotEmpty(userData.about as string))
          return 'Hej, ovo polje je obavezno';
        if (!validations.isWordCountValid(userData.about as string, 70))
          return 'Hej, moraš unijeti više od 70 riječi';
        break;

      case FlyTalksRegistrationDataFields.File:
        if (!userData.file) return 'Hej, ovo polje je obavezno';
        break;

      default:
        return undefined;
    }
  }
  return undefined;
};
