import { CORRELATION_ID_KEY } from '@/modules/app/infrastructure/constants/common.constant'
import { CorrelationIdMiddleware } from '@/modules/app/infrastructure/middlewares/correlation-id.middleware'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { Test } from '@nestjs/testing'
import { NextFunction, Request, Response } from 'express'

describe('CorrelationIdMiddleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let correlationIdMiddleware: CorrelationIdMiddleware

  beforeEach(async () => {
    jest.clearAllMocks()
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [CorrelationIdMiddleware]
    }).compile()

    correlationIdMiddleware = moduleRef.get<CorrelationIdMiddleware>(CorrelationIdMiddleware)
  })

  it('should be defined', () => {
    expect(correlationIdMiddleware).toBeDefined()
  })
  describe('use', () => {
    it('should generate a correlation id', () => {
      req = getMockReq()
      res = getMockRes().res
      res.append = function (key, value) {
        this.header[key] = value
        return this
      }
      next = getMockRes().next
      correlationIdMiddleware.use(req, res, next)
      expect(req.headers[CORRELATION_ID_KEY]).toBeDefined()
      expect(res.header[CORRELATION_ID_KEY]).toBeDefined()
    })
    it('should preserve a request correlation id', () => {
      req = getMockReq()
      res.append = function (key, value) {
        this.header[key] = value
        return this
      }
      next = getMockRes().next
      req.headers['x-correlation-id'] = 'dummy-correlation-id'
      correlationIdMiddleware.use(req, res, next)
      expect(req.headers['x-correlation-id']).toBeDefined()
      expect(req.headers['x-correlation-id']).toBe('dummy-correlation-id')
      expect(res.header[CORRELATION_ID_KEY]).toBeDefined()
      expect(res.header['x-correlation-id']).toBe('dummy-correlation-id')
    })
  })
})
