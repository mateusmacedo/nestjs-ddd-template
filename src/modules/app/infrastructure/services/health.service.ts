import { IHealthService } from '@/modules/app/infrastructure/contracts/health-service.interface'
import { Injectable } from '@nestjs/common'
import { HealthCheckResult, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus'

@Injectable()
export class HealthService implements IHealthService {
  constructor(private health: HealthCheckService, private http: HttpHealthIndicator) {}

  async performHealthCheck(): Promise<HealthCheckResult> {
    /* istanbul ignore next */
    return this.health.check([() => this.http.pingCheck('dependency-api', 'https://docs.nestjs.com')])
  }
}
