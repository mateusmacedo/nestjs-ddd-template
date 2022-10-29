import { HealthCheckResult } from '@nestjs/terminus'

export interface IHealthService {
  performHealthCheck(): Promise<HealthCheckResult>
}
