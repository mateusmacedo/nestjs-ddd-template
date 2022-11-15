import { ICommand } from '@nestjs/cqrs'

export type commandQueryProps = { [key: string]: ICommand }

export class CommandQueryFactory<Actions> {
  private _commandsOrQueriesMap: Map<Actions, any> = new Map()
  constructor(commands: commandQueryProps) {
    this.register(commands)
  }

  register(commands: commandQueryProps): void {
    Object.entries(commands).map((command) => {
      this._commandsOrQueriesMap.set(command[0] as unknown as Actions, command[1])
    })
  }

  exists(action: Actions): boolean {
    return this._commandsOrQueriesMap.has(action)
  }

  create<TDto>(action: Actions, props?: TDto): ICommand {
    if (!this.exists(action)) throw new Error('nao existe comando para a acao ' + action)
    const commandInstance = this._commandsOrQueriesMap.get(action)
    return new commandInstance(props)
  }

  get() {
    return this._commandsOrQueriesMap.entries()
  }
}
