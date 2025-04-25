export enum QrCodeDataType {
  ACHIEVEMENT = 'achievement',
  TRANSACTION = 'transaction',
  ACCREDITATION = 'accreditation',
}

export type QrCodeData = {
  dataType: QrCodeDataType;
  data: string;
};
