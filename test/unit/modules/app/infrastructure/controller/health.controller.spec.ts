import { HealthController } from '@/modules/app/infrastructure/controller/http/health.controller'
import { HealthService } from '@/modules/app/infrastructure/services/health.service'
import { HealthCheckResult } from '@nestjs/terminus'
import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'

describe('HealthController', () => {
  let sut: HealthController
  const mockHealthCheckResult: HealthCheckResult = {
    status: 'ok',
    details: {
      'health-indicator-1': {
        status: 'up'
      }
    }
  }
  const mockHealthService = mock<HealthService>({
    performHealthCheck: jest.fn(async () => mockHealthCheckResult)
  })

  beforeEach(async () => {
    jest.clearAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: mockHealthService
        }
      ]
    }).compile()
    sut = module.get<HealthController>(HealthController)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
  describe('getHandle', () => {
    it('should call health service perform health check correctly', async () => {
      const performHealthCheckSpy = jest.spyOn(mockHealthService, 'performHealthCheck')
      await sut.getHandle()
      expect(performHealthCheckSpy).toHaveBeenCalledTimes(1)
      expect(performHealthCheckSpy).toHaveBeenCalledWith()
    })
    it('should return a HealthCheckResult instance', async () => {
      const result = await sut.getHandle()
      expect(result).toEqual(mockHealthCheckResult)
    })
  })
})
