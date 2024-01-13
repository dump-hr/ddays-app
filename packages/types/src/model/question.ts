type CommonRules = {
  required?: string;
  validate?: (value: any) => string;
};

type Rule<T> = {
  value: T;
  message: string;
};

type StringRules = {
  pattern?: Rule<RegExp>;
  minLength?: Rule<number>;
  maxLength?: Rule<number>;
};

type NumbericRules = {
  min?: Rule<number>;
  max?: Rule<number>;
};

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

export type Option = {
  label: string;
  value: any;
};

export type Question = {
  id: string;
  title?: string;
  defaultValue?: any;
  rules?: CommonRules;
} & (
  | {
      type: QuestionType.Field;
      rules?: StringRules;
    }
  | {
      type: QuestionType.Number;
      rules?: NumbericRules;
    }
  | {
      type: QuestionType.TextArea;
      rows?: number;
      rules?: StringRules;
    }
  | {
      type: QuestionType.Checkbox;
    }
  | {
      type: QuestionType.Date;
      rules?: NumbericRules;
    }
  | {
      type: QuestionType.DateTime;
      rules?: NumbericRules;
    }
  | {
      type: QuestionType.Select;
      options: string[];
      isAllowedEmpty?: boolean;
    }
  | {
      type: QuestionType.MultipleSelect;
      options: Option[];
    }
);
