export interface UuIdInterface {
  generate(): string

  isValid(uuid: string): boolean
}
