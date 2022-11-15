/**
 * classe de result geral.
 * serve para padronizar os retornos entre camadas, havendo assim, uma unica estrutura entre ambas.
 */
export class Result<T> {
  public isError: boolean
  private error: T | string | string[]
  private _value: T

  public constructor(isSuccess: boolean, error?: T | string | string[], value?: T) {
    if (isSuccess && error) {
      throw new Error('OperacaoInvalida: O resultado nao pode ser valido e invalido ao mesmo tempo.')
    }
    if (!isSuccess && !error) {
      throw new Error('OperacaoInvalida: O resultado deve ser valido ou invalido.')
    }

    this.isError = !isSuccess
    this.error = error
    this._value = value

    Object.freeze(this)
  }

  public getValue(): T {
    if (this.isError) {
      throw new Error('O valor invalido e retornado na funcao errorValue')
    }

    return this._value
  }

  public getError(): T | string | string[] {
    return this.error
  }
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }

  public static fail<U>(error: string | U): Result<U> {
    return new Result<U>(false, error)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isError) return result
    }
    return Result.ok()
  }
}
