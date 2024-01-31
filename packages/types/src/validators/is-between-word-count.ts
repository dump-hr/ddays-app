import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsBetweenWordCount(
  limit: number,
  deviation: number,
  validationOptions: ValidationOptions = {
    message: 'Value not in the word count bounds',
  },
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBetweenWordCount',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return validateWordCount(value, limit, deviation);
        },
      },
    });
  };
}

function validateWordCount(str: string, limit: number, deviation: number) {
  const lowerBound = limit - deviation;
  const upperBound = limit + deviation;

  const wc = str.match(/\S+/g)?.length || 0;

  return wc >= lowerBound && wc <= upperBound;
}
