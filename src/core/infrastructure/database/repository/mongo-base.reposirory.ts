import { isValidObjectId, Model, UpdateQuery } from 'mongoose'
import { IRepository } from './IRepository'
import { RepositoryError } from './repository.error'

export abstract class MongoBaseRepository<T> implements IRepository<T> {
  constructor(private schema: Model<any>) {}

  getPaginationParams(page: number, perPage?: number): { take: number; skip: number } {
    perPage = perPage ?? 10 //default 10 registros
    const pageNumber = page ? page - 1 : 0
    const skip = perPage * pageNumber
    return { take: perPage, skip: skip }
  }

  async list(
    filter?: object,
    page?: number,
    _perPage?: number
  ): Promise<{ rows: T[]; totalRows: number; perPage: number } | RepositoryError<T>> {
    filter = filter ?? {}
    const { take: take, skip: skip } = this.getPaginationParams(page, _perPage)
    const countResult = await this.schema.count({ where: filter })
    const rows = await this.schema.find(filter).skip(skip).limit(take)
    return { rows: rows, totalRows: countResult, perPage: take }
  }

  async findOne(filter: Partial<any>): Promise<T> {
    return await this.schema.findOne(filter)
  }

  async find(filter: Partial<any>): Promise<T[]> {
    return await this.schema.find(filter)
  }

  async upsert(data: Partial<T> | UpdateQuery<T>, _id?: number | string): Promise<any> {
    console.log('UPSERT>>>>>', data)
    /* if (_id) {
      return await this.schema.findOneAndUpdate({ _id }, data, {
        returnOriginal: false,
      });
    } else {
      return await new this.schema(data).save();
    } */
  }

  async remove(filter: Partial<any>) {
    return await this.schema.remove(filter)
  }

  isValidIdKey(_id: string): boolean {
    return isValidObjectId(_id)
  }
}
