import { CORRELATION_ID_KEY } from '@/infrastructure/constants/common.constant'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let correlationId = req.headers[CORRELATION_ID_KEY]
    if (!correlationId) {
      correlationId = uuidv4()
    }
    req.headers[CORRELATION_ID_KEY] = correlationId
    res.append(CORRELATION_ID_KEY, correlationId)
    next()
  }
}
