interface CommandInterface {
  execute(): void
}
export interface CommandQueryFactoryInterface<Actions> {
  exists(action: Actions): boolean

  create<TDto>(action: Actions, props?: TDto): CommandInterface

  get()
}
