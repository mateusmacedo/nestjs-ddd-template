import { appConfig } from '@/infrastructure/config/app.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModuleBuilder } from '@nestjs/testing'

describe('appConfig', () => {
  jest.clearAllMocks()
  let configService: ConfigService
  let testingModuleBuilder: TestingModuleBuilder
  beforeEach(() => {
    testingModuleBuilder = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: 'test.env',
          expandVariables: true,
          cache: false
        }),
        ConfigModule.forFeature(appConfig())
      ],
      controllers: [],
      providers: []
    })
  })
  it('should have appropriate app configs', async () => {
    const moduleRef = await testingModuleBuilder.compile()
    configService = moduleRef.get<ConfigService>(ConfigService)
    const configs = configService.get('app')
    expect(configs).toHaveProperty('env')
    expect(configs).toHaveProperty('name')
    expect(configs).toHaveProperty('description')
    expect(configs).toHaveProperty('version')
    expect(configs).toHaveProperty('port')
    expect(configs).toHaveProperty('baseUrl')
    expect(configs).toHaveProperty('baseUri')
    expect(configs).toHaveProperty('docsUri')
  })
  it('should throw a error if appropriate app configs is not present', async () => {
    const moduleRef = testingModuleBuilder.compile()
    delete process.env.APP_NAME
    await expect(moduleRef).rejects.toThrow()
  })
})
