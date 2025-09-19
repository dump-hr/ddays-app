import dayjs from 'dayjs';
import {
  Controller,
  ControllerRenderProps,
  UseFormReturn,
} from 'react-hook-form';

import { Question, QuestionType } from '../../types/question';
import { Input } from '../Input';
import { MultipleSelectInput } from '../MultipleSelectInput';
import { SelectInput } from '../SelectInput';
import { TextArea } from '../TextArea';
import c from './InputHandler.module.scss';

type InputHandlerProps = {
  question: Question;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
};

const inputDefaultValues = {
  [QuestionType.Field]: '',
  [QuestionType.Number]: 0,
  [QuestionType.TextArea]: '',
  [QuestionType.Checkbox]: false,
  [QuestionType.Date]: dayjs().format('YYYY-MM-DD'),
  [QuestionType.DateTime]: dayjs().format('YYYY-MM-DD HH:mm'),
  [QuestionType.Select]: '',
  [QuestionType.MultipleSelect]: [],
};

const getInputComponent = (
  question: Question,
  field: ControllerRenderProps,
) => {
  const controlProps = { ...field, ref: undefined, innerRef: field.ref };

  switch (question.type) {
    case QuestionType.Field:
      return <Input {...controlProps} />;
    case QuestionType.Number:
      return (
        <Input
          {...controlProps}
          type='number'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            field.onChange(+e.target.value)
          }
        />
      );
    case QuestionType.TextArea:
      return <TextArea {...controlProps} rows={question.rows ?? 5} />;
    case QuestionType.Checkbox:
      return (
        <Input
          {...controlProps}
          type='checkbox'
          checked={controlProps.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            field.onChange(e.target.checked)
          }
        />
      );
    case QuestionType.Date:
      return <Input {...controlProps} type='date' />;
    case QuestionType.DateTime:
      return <Input {...controlProps} type='datetime-local' />;
    case QuestionType.Select:
      return (
        <SelectInput
          options={question.options}
          isAllowedEmpty={question.isAllowedEmpty}
          {...controlProps}
        />
      );
    case QuestionType.MultipleSelect:
      return (
        <MultipleSelectInput options={question.options} {...controlProps} />
      );
    default:
      return <></>;
  }
};

export const InputHandler: React.FC<InputHandlerProps> = ({
  question,
  form,
}) => {
  return (
    <Controller
      control={form.control}
      name={question.id}
      defaultValue={question.defaultValue ?? inputDefaultValues[question.type]}
      disabled={question.disabled}
      render={({ field, fieldState }) => (
        <div>
          {question.title && (
            <label className={c.label} htmlFor={question.id}>
              {question.title}
            </label>
          )}
          {getInputComponent(question, field)}
          {fieldState.error && (
            <p className={c.error}>{fieldState.error.message || 'Error'}</p>
          )}
        </div>
      )}
    />
  );
};
