import { Question, QuestionType } from '@ddays-app/types';

import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import Input from '../Input';

type InputHandlerProps = {
  question: Question;
  form: UseFormReturn<FieldValues>;
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
      return <>tarea</>;
    case QuestionType.Select:
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
    default:
      return <></>;
  }
};

const InputHandler = ({ question, form }: InputHandlerProps) => {
  const { control } = form;

  return (
    <>
      {question.title && <p>{question.title}</p>}
      <Controller
        control={control}
        name={question.id}
        defaultValue={question.registerValue}
        rules={question.rules}
        render={({ field }) => getInputComponent(question, field)}
      />
    </>
  );
};

export default InputHandler;
