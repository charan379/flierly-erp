import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { TaxIdentity } from '@/entities/taxation/TaxIdentity.entity';

// Custom constraint that works on a class level
@ValidatorConstraint({ async: false })
class GSTCompleteConstraint implements ValidatorConstraintInterface {
  validate(taxIdentity: TaxIdentity, args: ValidationArguments) {
    // If GST is provided, both gstRegistrationDate and gstAddress must exist
    if (taxIdentity.gst) {
      return !!taxIdentity.gstRegistrationDate && !!taxIdentity.gstAddress;
    }
    return true; // No GST, so validation passes
  }

  defaultMessage(args: ValidationArguments) {
    return 'GST Registration Date and GST Address must be provided if GST is present.';
  }
}

// Apply validation to the class level
export function IsGSTComplete(validationOptions?: ValidationOptions) {
  return function (object: Function) {
    registerDecorator({
      target: object,
      propertyName: '', // Class-level decorators don't need a property name
      options: validationOptions,
      validator: GSTCompleteConstraint, // Use the class validator we defined
    });
  };
}
