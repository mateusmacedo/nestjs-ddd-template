import { IsEqualTo } from '@/infrastructure/decorator/validation/is-equal-to.decorator'
import { validate } from 'class-validator'

describe('IsEqualToDecorator', () => {
  it('should be validate successfully', async () => {
    class MyClass {
      myProperty: string
      @IsEqualTo('myProperty')
      myEqualProperty: string
    }
    const myClass = new MyClass()
    myClass.myProperty = 'dummy'
    myClass.myEqualProperty = 'dummy'
    const result = await validate(myClass)
    expect(result.length).toBe(0)
  })

  it('should be not validate successfully', async () => {
    class MyClass {
      myProperty: string
      @IsEqualTo('myProperty')
      myEqualProperty: string
    }
    const myClass = new MyClass()
    myClass.myProperty = 'dummy'
    myClass.myEqualProperty = 'notEqual'
    const result = await validate(myClass)
    expect(result.length).toBe(1)
    expect(result[0].property).toBe('myEqualProperty')
    expect(result[0].constraints.isEqualTo).toBe('myEqualProperty must match myProperty exactly')
  })
})
