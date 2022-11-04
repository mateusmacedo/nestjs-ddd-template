import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsEqualTo<T>(property: keyof T, validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as unknown)[relatedPropertyName]
          return value === relatedValue
        },

        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          return `${propertyName} must match ${relatedPropertyName} exactly`
        }
      }
    })
  }
}
