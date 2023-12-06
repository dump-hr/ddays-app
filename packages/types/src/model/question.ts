export enum QuestionType {
  Field = 'Field',
  Number = 'Number',
  TextArea = 'TextArea',
  Select = 'Select',
  Checkbox = 'Checkbox',
  Date = 'Date',
  DateTime = 'DateTime',
}

export type Question = {
  id: string;
  title?: string;
  registerValue?: any;
  rules?: { required?: boolean };
} & (
  | { type: QuestionType.Field }
  | { type: QuestionType.Number; rules?: { min?: number; max?: number } }
  | { type: QuestionType.TextArea }
  | { type: QuestionType.Checkbox; options?: string[] }
  | { type: QuestionType.Select; options: string[]; allowMultiple: boolean }
  | { type: QuestionType.Date }
  | { type: QuestionType.DateTime }
);
