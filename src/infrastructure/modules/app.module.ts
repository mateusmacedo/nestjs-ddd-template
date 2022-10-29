import { AppController } from '@/infrastructure/controller/app.controller'
import { AppService } from '@/infrastructure/services/app.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
