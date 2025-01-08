import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

/**
 * Custom validator to check if the object values are 'ascend' or 'descend'.
 */
export function IsSortOrderObject(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSortOrderObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'object' || value === null) return false;
          for (const key in value) {
            if (value[key] !== 'ascend' && value[key] !== 'descend') {
              return false;
            }
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should be an object with values 'ascend' or 'descend'`;
        },
      },
    });
  };
}
