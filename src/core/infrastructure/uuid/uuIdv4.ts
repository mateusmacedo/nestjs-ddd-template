import { v4, validate } from 'uuid'
import { UuIdInterface } from './uuid.interface'
export class UuIdV4 implements UuIdInterface {
  generate(): string {
    return v4()
  }

  isValid(uuid: string): boolean {
    return validate(uuid)
  }
}
