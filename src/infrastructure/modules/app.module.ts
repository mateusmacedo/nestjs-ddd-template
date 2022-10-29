import { AppController } from '@/infrastructure/controller/app.controller'
import { CorrelationIdMiddleware } from '@/infrastructure/middlewares/correlation-id.middleware'
import { CommonModule } from '@/infrastructure/modules/common.module'
import { AppService } from '@/infrastructure/services/app.service'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : 'test.env',
      expandVariables: process.env.NODE_ENV !== 'production',
      cache: true,
      isGlobal: true
    }),
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*')
  }
}
