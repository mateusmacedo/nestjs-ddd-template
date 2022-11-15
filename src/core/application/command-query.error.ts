import { Result } from '@/core/shared/result'

/**
 * classe de erro dos commands e querys geral, para criar novos erros que não existem ou que seja bem
 * especifico, usar esta classe
 * @param errorOrMessage erro a ser retornado (string | T)
 * @returns Result<T>
 */
export class CommandQueryError<TCommand> extends Result<TCommand> {
  constructor(errorOrMessage: string | string[]) {
    super(false, errorOrMessage)
  }
}
