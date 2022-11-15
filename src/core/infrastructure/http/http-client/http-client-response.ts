import assert from 'assert'

import _ from 'lodash'
import { plainToClass, plainToInstance } from 'class-transformer'
import { validateOrReject, validate } from 'class-validator'
import { HttpStatus } from '@nestjs/common'

type ClassType<T> = {
  new (...args: any[]): T
}

export class HttpClientResponse {
  public constructor(
    public readonly statusCode: number,
    private readonly data: unknown,
    private readonly headers?: unknown
  ) {}

  public hasStatus(status: number): boolean {
    return this.statusCode === status
  }

  public hasStatusOrThrow(status: number | number[]): void {
    let hasStatus: boolean

    if (Array.isArray(status)) {
      hasStatus = status.includes(this.statusCode)
    } else {
      hasStatus = this.statusCode === status
    }

    if (!hasStatus) {
      throw new Error(`Request failed with status code ${this.statusCode}`)
    }
  }

  public isClientError(): boolean {
    return this.statusCode >= HttpStatus.BAD_REQUEST && this.statusCode < HttpStatus.INTERNAL_SERVER_ERROR
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getData<T extends object>(dataType: ClassType<T>): Promise<T> {
    const data: T = plainToClass(dataType, this.data)
    await validateOrReject(data)
    return data
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getArrayData<T extends object>(dataType: ClassType<T>): Promise<T[]> {
    assert(Array.isArray(this.data), 'Expected the data content to be an array')

    const data: T[] = plainToInstance(dataType, this.data)
    await validateOrReject(data)
    return data
  }

  public async getRawData(): Promise<unknown> {
    return this.data
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async hasError<T extends object>(errorType: ClassType<T>, checker: (error: T) => boolean): Promise<boolean> {
    const error: T = plainToClass(errorType, this.data)
    const validationErrors = await validate(error)

    return validationErrors.length === 0 && checker(error)
  }

  public getHeader(key: string): string | undefined {
    const header: unknown = _.get(this.headers, key.toLowerCase())
    if (typeof header !== 'string') return undefined
    return header
  }
}
