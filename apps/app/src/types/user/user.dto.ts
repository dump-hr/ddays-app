export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatedPassword: string;
  phoneNumber: string;
  birthYear: number | null;
  educationDegree: string | null;
  occupation: string | null;
  newsletterEnabled: boolean;
  companiesNewsEnabled: boolean;
  termsAndConditionsEnabled: boolean;
};

export enum UserDataFields {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Password = 'password',
  RepeatedPassword = 'repeatedPassword',
  PhoneNumber = 'phoneNumber',
  BirthYear = 'birthYear',
  EducationDegree = 'educationDegree',
  Occupation = 'occupation',
  NewsletterEnabled = 'newsletterEnabled',
  CompaniesNewsEnabled = 'companiesNewsEnabled',
  TermsAndConditionsEnabled = 'termsAndConditionsEnabled',
}
