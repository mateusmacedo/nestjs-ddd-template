import { IsStrongSentence } from '@/infrastructure/decorator/validation/is-strong-sentence.decorator'
import { validate } from 'class-validator'

describe('IsStrongSentence', () => {
  class MyClass {
    @IsStrongSentence({
      mustContainLowerLetter: true,
      mustContainNumber: true,
      mustContainSpecialCharacter: true,
      mustContainUpperLetter: true
    })
    sentence: string
  }
  it('should be validate successfully', async () => {
    const myClass = new MyClass()
    myClass.sentence = '@Qazwsx123'
    const result = await validate(myClass)
    expect(result.length).toBe(0)
  })

  it('should be not validate when not has special character', async () => {
    const myClass = new MyClass()
    myClass.sentence = 'Qazwsx123'
    const result = await validate(myClass)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('sentence')
    expect(result[0].constraints.isStrongSentenceConstraint).toBe('sentence must contain special characters')
  })

  it('should be not validate when not has uppercase letter', async () => {
    const myClass = new MyClass()
    myClass.sentence = '@qazwsx123'
    const result = await validate(myClass)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('sentence')
    expect(result[0].constraints.isStrongSentenceConstraint).toBe('sentence must contain uppercase letter')
  })

  it('should be not validate when not has lowercase letter', async () => {
    const myClass = new MyClass()
    myClass.sentence = '@QAZWSX123'
    const result = await validate(myClass)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('sentence')
    expect(result[0].constraints.isStrongSentenceConstraint).toBe('sentence must contain lowercase letter')
  })

  it('should be not validate when not has a number', async () => {
    const myClass = new MyClass()
    myClass.sentence = '@QAZWSXabc'
    const result = await validate(myClass)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('sentence')
    expect(result[0].constraints.isStrongSentenceConstraint).toBe('sentence must contain number')
  })
})
