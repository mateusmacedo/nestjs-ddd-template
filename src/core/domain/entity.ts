import { UuIdV4 } from '@/core/infrastructure/uuid/uuIdv4'

export type EntityProps = {
  id?: string | number
}
/**
 * classe reveladora de intenção da entidade.
 * toda entidade de domino deve estender essa classe, serve para identificar um domain entity.
 */
export abstract class Entity {
  readonly id

  constructor(id?: string | number) {
    this.id = id ?? new UuIdV4().generate()
  }
}
