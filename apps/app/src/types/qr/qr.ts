export enum QrCodeDataType {
  ACHIEVEMENT = 'achievement',
  TRANSACTION = 'transaction',
  ACCREDITATION = 'accreditation',
  CODE = 'code',
}

export type QrCodeData = {
  dataType: QrCodeDataType;
  data: string;
};
