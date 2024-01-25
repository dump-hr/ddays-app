export enum QuestionType {
  Field = 'Field',
  Number = 'Number',
  TextArea = 'TextArea',
  Checkbox = 'Checkbox',
  Date = 'Date',
  DateTime = 'DateTime',
  Select = 'Select',
  MultipleSelect = 'MultipleSelect',
}

type OptionValue = string | number;

type Option = {
  label: string;
  value: OptionValue;
};

export type Question = {
  id: string;
  title?: string;
  disabled?: boolean;
} & (
  | {
      type: QuestionType.Field;
      defaultValue?: string | number;
    }
  | {
      type: QuestionType.Number;
      defaultValue?: string | number;
    }
  | {
      type: QuestionType.TextArea;
      rows?: number;
      defaultValue?: string;
    }
  | {
      type: QuestionType.Checkbox;
      defaultValue?: boolean;
    }
  | {
      type: QuestionType.Date;
      defaultValue?: string;
    }
  | {
      type: QuestionType.DateTime;
      defaultValue?: string;
    }
  | {
      type: QuestionType.Select;
      options: string[];
      isAllowedEmpty?: boolean;
      defaultValue?: string;
    }
  | {
      type: QuestionType.MultipleSelect;
      options: Option[];
      defaultValue?: OptionValue[];
    }
);
