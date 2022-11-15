import { CommandHandlerInterface } from '@/core/application/command-handler.interface'
import { CommandQueryFactoryInterface } from '@/core/infrastructure/cqrs/command-query-factory.interface'

export abstract class QueryFactory<QueryActions> {
  constructor(private readonly commandQueryFactory: CommandQueryFactoryInterface<QueryActions>) {}

  queryExists(action: QueryActions): boolean {
    return this.commandQueryFactory.exists(action)
  }
  createQuery<TProps, TQuery>(action: QueryActions, props: TProps): CommandHandlerInterface<TQuery> {
    return this.commandQueryFactory.create(action, props)
  }
  getQuery() {
    return this.commandQueryFactory.get()
  }
}
