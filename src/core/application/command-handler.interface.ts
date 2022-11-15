import { Result } from '@/core/shared/result'

/**
 * interface reveladora de intenção dos manipuladores de comando.
 * todo manipulador de comando DEVE implementar esta classe.
 */
export interface CommandHandlerInterface<TCommand, TResponse = void | Result<any>> {
  execute(command: TCommand): Promise<TResponse> | TResponse
}
