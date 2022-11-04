import { appConfig } from '@/modules/app/infrastructure/config/app.config'
import { HealthController } from '@/modules/app/infrastructure/controller/http/health.controller'
import { CorrelationIdMiddleware } from '@/modules/app/infrastructure/middlewares/correlation-id.middleware'
import { HealthService } from '@/modules/app/infrastructure/services/health.service'
import { HttpModule } from '@nestjs/axios'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : 'test.env',
      expandVariables: process.env.NODE_ENV !== 'production',
      cache: true,
      isGlobal: true
    }),
    ConfigModule.forFeature(appConfig()),
    HttpModule,
    TerminusModule
  ],
  controllers: [HealthController],
  providers: [HealthService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*')
  }
}
