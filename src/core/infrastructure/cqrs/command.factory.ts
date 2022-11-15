import { CommandHandlerInterface } from '@/core/application/command-handler.interface'
import { CommandQueryFactoryInterface } from '@/core/infrastructure/cqrs/command-query-factory.interface'

export abstract class CommandFactory<CommandsActions> {
  constructor(private readonly commandQueryFactory: CommandQueryFactoryInterface<CommandsActions>) {}

  commandExists(action: CommandsActions): boolean {
    return this.commandQueryFactory.exists(action)
  }
  createCommand<TProps, TCommand>(action: CommandsActions, props: TProps): CommandHandlerInterface<TCommand> {
    return this.commandQueryFactory.create(action, props)
  }
  getCommands() {
    return this.commandQueryFactory.get()
  }
}
