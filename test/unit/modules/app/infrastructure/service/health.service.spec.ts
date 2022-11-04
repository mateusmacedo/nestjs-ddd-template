import { HealthService } from '@/modules/app/infrastructure/services/health.service'
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus'
import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'

describe('HealthService', () => {
  let sut: HealthService
  const mockHttpHealthIndicator = mock<HttpHealthIndicator>({
    pingCheck: jest.fn().mockImplementation(async () => Promise.resolve())
  })
  const mockHealthCheckService = mock<HealthCheckService>({
    check: jest.fn().mockImplementation(async () => mockHttpHealthIndicator.pingCheck.mockRejectedValue({}))
  })
  beforeEach(async () => {
    jest.clearAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService
        },
        {
          provide: HttpHealthIndicator,
          useValue: mockHttpHealthIndicator
        },
        HealthService
      ]
    }).compile()

    sut = module.get<HealthService>(HealthService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
  describe('performHealthCheck', () => {
    it('should call HealthCheckService.check correctly', async () => {
      await sut.performHealthCheck()
      expect(mockHealthCheckService.check).toHaveBeenCalledTimes(1)
      expect(mockHealthCheckService.check).toHaveBeenCalledWith([expect.any(Function)])
    })
  })
})
