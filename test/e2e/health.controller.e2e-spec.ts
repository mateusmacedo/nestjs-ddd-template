import { AppModule } from '@/modules/app/infrastructure/app.module'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing'
import request from 'supertest'

jest.setTimeout(30000)

describe('HealthController (e2e)', () => {
  let app: INestApplication
  beforeAll(async () => {
    const moduleBuilder: TestingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
      controllers: [],
      providers: []
    })
    const moduleFixture: TestingModule = await moduleBuilder.compile()
    app = moduleFixture.createNestApplication()
    await app.init()
    await app.listen(3000)
  })
  afterAll(async () => {
    await app.close()
  })
  it('/health (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/health')
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      status: 'ok',
      info: { 'dependency-api': { status: 'up' } },
      error: {},
      details: { 'dependency-api': { status: 'up' } }
    })
  })
})
