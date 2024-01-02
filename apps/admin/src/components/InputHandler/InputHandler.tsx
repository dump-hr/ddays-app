import { Question, QuestionType } from '@ddays-app/types';
import dayjs from 'dayjs';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';

import Input from '../Input';
import SelectInput from '../SelectInput';
import c from './InputHandler.module.scss';

type InputHandlerProps = {
  question: Question;
  form: UseFormReturn<FieldValues>;
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
  field: ControllerRenderProps<FieldValues>,
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
          onChange={(e) => field.onChange(+e.target.value)}
        />
      );
    case QuestionType.TextArea:
      return <></>; //TODO: toma
    case QuestionType.Checkbox:
      return (
        <Input
          {...controlProps}
          type='checkbox'
          checked={controlProps.value}
          onChange={(e) => field.onChange(e.target.checked)}
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
          label={controlProps.name}
          {...controlProps}
        />
      );
    case QuestionType.MultipleSelect:
      return <></>; //TODO: toma
    default:
      return <></>;
  }
};

const InputHandler = ({ question, form }: InputHandlerProps) => {
  const { control } = form;

  return (
    <Controller
      control={control}
      name={question.id}
      defaultValue={question.defaultValue ?? inputDefaultValues[question.type]}
      rules={question.rules}
      render={({ field, fieldState }) => (
        <>
          {question.title && (
            <label className={c.label} htmlFor={question.id}>
              {question.title}
            </label>
          )}
          {getInputComponent(question, field)}
          {fieldState.error && (
            <p className={c.error}>{fieldState.error.message || 'Error'}</p>
          )}
        </>
      )}
    />
  );
};

export default InputHandler;
