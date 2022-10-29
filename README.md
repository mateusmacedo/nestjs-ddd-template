# NestJS StartKit

## Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] `<task>`

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão `nodejs16`
- Você instalou a versão mais recente de `npm`
- Você tem uma máquina `<Windows / Linux / Mac>`

## ☕ Clonando e Instalando `<projeto>`

Para clonar o repositório `<projeto>`, siga estas etapas:

```bash
git clone `<projeto>`
```

Para instalar as dependências `<projeto>`, siga estas etapas:

```bash
npm install
```

## ⚙️ Configurando ambiente `<projeto>`

Utilizar o arquivo `example.env` como base para a criação dos seguintes arquivos de configuração:

- `.env`
- `test.env`

> Para as configurações dos módulos definir `src/<module>/configs/<module>.config.ts`, seguindo `src/common/configs/app.config.ts` como base.

## 🚀 Usando `<projeto>`

Para usar `<projeto>`, siga estas etapas:

```bash
# Unix users

# development
$ npm run start:dev

# debug watch mode
$ npm start:debug

# production mode
start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Gerando arquivo de change log

```bash
npm changelog # only changelog file
npm changelog:minor # x.y.x
npm changelog:major # y.x.x
npm changelog:patch # x.x.y
npm changelog:alpha # x.x.x-alpha.0
```
