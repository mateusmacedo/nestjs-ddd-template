import { appConfig } from '@/infrastructure/config/app.config'
import { HealthController } from '@/infrastructure/controller/health.controller'
import { HealthService } from '@/infrastructure/services/health.service'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [ConfigModule.forFeature(appConfig()), HttpModule, TerminusModule],
  controllers: [HealthController],
  providers: [HealthService]
})
export class CommonModule {}
