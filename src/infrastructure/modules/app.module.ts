import { AppController } from '@/infrastructure/controller/app.controller'
import { CommonModule } from '@/infrastructure/modules/common.module'
import { AppService } from '@/infrastructure/services/app.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: '.env',
      expandVariables: process.env.NODE_ENV !== 'production',
      cache: true,
      isGlobal: true
    }),
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
