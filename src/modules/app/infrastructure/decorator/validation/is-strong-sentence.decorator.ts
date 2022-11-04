import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

export interface PasswordValidationRequirement {
  mustContainSpecialCharacter?: boolean
  mustContainUpperLetter?: boolean
  mustContainLowerLetter?: boolean
  mustContainNumber?: boolean
}

export class StringUtilities {
  static containsUpperCase(value: string): boolean {
    return /[A-Z]/.test(value)
  }

  static containsLowerCase(value: string): boolean {
    return /[a-z]/.test(value)
  }

  static containsNumber(value: string): boolean {
    return /[0-9]/.test(value)
  }

  static containsSpecialCharacter(value: string): boolean {
    return /[!#$%&'()*+,-./:;<=>?@[\]^_{|}~]/.test(value)
  }
}

@ValidatorConstraint({ name: 'isStrongSentenceConstraint', async: false })
export class IsStrongSentenceConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const relatedValue = args.constraints[0] as PasswordValidationRequirement

    if (relatedValue.mustContainUpperLetter) {
      if (!StringUtilities.containsUpperCase(value)) return false
    }

    if (relatedValue.mustContainLowerLetter) {
      if (!StringUtilities.containsLowerCase(value)) return false
    }

    if (relatedValue.mustContainNumber) {
      if (!StringUtilities.containsNumber(value)) return false
    }

    if (relatedValue.mustContainSpecialCharacter) {
      if (!StringUtilities.containsSpecialCharacter(value)) return false
    }

    return true
  }

  defaultMessage(args: ValidationArguments) {
    const value = args.value
    const relatedValue = args.constraints[0] as PasswordValidationRequirement

    if (relatedValue.mustContainUpperLetter) {
      if (!StringUtilities.containsUpperCase(value)) return `${args.property} must contain uppercase letter`
    }

    if (relatedValue.mustContainLowerLetter) {
      if (!StringUtilities.containsLowerCase(value)) return `${args.property} must contain lowercase letter`
    }

    if (relatedValue.mustContainNumber) {
      if (!StringUtilities.containsNumber(value)) return `${args.property} must contain number`
    }

    if (relatedValue.mustContainSpecialCharacter) {
      if (!StringUtilities.containsSpecialCharacter(value)) return `${args.property} must contain special characters`
    }
  }
}

export function IsStrongSentence(constraints: PasswordValidationRequirement, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isStrongSentence',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [constraints],
      options: validationOptions,
      validator: IsStrongSentenceConstraint
    })
  }
}
