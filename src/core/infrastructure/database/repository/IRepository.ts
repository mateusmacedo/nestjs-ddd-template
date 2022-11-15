import { RepositoryError } from './repository.error'

export type QueryProps = {
  [key: string]: any
}
export interface IRepository<T> {
  getPaginationParams(page: number, perPage?: number)

  list(
    filter?: QueryProps,
    page?: number,
    _perPage?: number
  ): Promise<{ rows: T[]; totalRows: number; perPage: number } | RepositoryError<T>>

  findOne(filter: Partial<any>): Promise<T>

  find(filter: Partial<any>): Promise<T[]>

  upsert(data: Partial<any>, _id?: number | string): Promise<T>

  remove(filter: Partial<any>): Promise<any>

  isValidIdKey(_id: string): boolean
}
