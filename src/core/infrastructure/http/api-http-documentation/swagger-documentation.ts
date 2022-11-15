import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApiHttpDocumentationInterface } from './api-http-documentation.interface'
export class SwaggerDocumentation implements ApiHttpDocumentationInterface {
  private _version = '1.0'
  private _title = 'Api - Banking Backend Conta PF'
  private _description = `<p>Api responsável pela funcionalidade de conta PF.</p><br>
       <p>Há alguns pontos a se considerar andes de começar o uso. sendo esses:</p>
       <ul>
          <li><b>TODA</b> requisição que necessite de corpo(body) <b>DEVE</b> ter o tipo <b>JSON</b></li>
          <li><b>TODO</b> retorno de requisição é do tipo <b>JSON</b></li>
          <li>A API suporta os verbos: <b>GET, POST, PUT, DELETE</b></li>
          <li>Rotas que necessitam de <b>AUTENTICAÇÃO</b> usam o esquema de <b>BEARER TOKEN</b>, que deve ser enviado no header Authorization da requisição.</li>
       </ul>
      `
  constructor(private _app: INestApplication) {}

  set title(title: string) {
    this._title = title
  }

  set description(desc: string) {
    this._description = desc
  }

  set version(ver: string) {
    this._version = ver
  }

  generate(route?: string) {
    const config = new DocumentBuilder()
      .setTitle(this._title)
      .setDescription(this._description)
      .setVersion(this._version)
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(this._app, config)
    SwaggerModule.setup(route, this._app, document, {
      customCss: '.topbar{display:none}',
      customSiteTitle: 'Conta PF - Busca de Rede de Postos.',
      customfavIcon: ''
    })
  }
}
