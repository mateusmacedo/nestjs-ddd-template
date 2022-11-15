/**
 * data mapper pattern.
 * classe de mapeamento entre domain, dto, persistencia
 * esta classe serve como intermediador entre o dominio e os servicos ao qual dependem dele
 * serve tambem para isolar ambas as camadas(infra e domain) a nivel de retorno e requisicao entre as mesmas
 */
export abstract class MapperInterface {
  /**
   * converte o dado para o dominio, pode ser chamado na camada de infrastructure para transformar
   * o retorno do banco de dados no dominio
   */
  abstract toDomain<TDomain>(rawData: Partial<any>): TDomain

  /**
   * converte o dominio para o padrao de retorno, pode ser http, ou outro.
   * @param {TDomain} data Users dados do dominio usuario
   * @returns objeto no padrao de retorno
   */
  abstract toDto?<TDomain, TDto>(data: TDomain): TDto

  /**
   * converte o dominio para o padrao do banco de dados.
   * @param {T} data Users dados de dominio usuario.
   * @returns objeto no padrao de persisitencia do dominio
   */
  abstract toPersistence<T>(domainData: T): Partial<any>
}
