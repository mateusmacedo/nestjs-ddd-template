import { registerAs } from '@nestjs/config'
import Joi from 'joi'

export const appConfig = () =>
  registerAs('app', () => {
    const values = {
      name: process.env.APP_NAME,
      description: process.env.APP_DESCRIPTION,
      version: process.env.APP_VERSION,
      port: parseInt(process.env.APP_PORT),
      baseUrl: process.env.APP_BASE_URL,
      baseUri: process.env.APP_BASE_URI,
      docsUri: process.env.APP_DOCS_URI
    }
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      version: Joi.string().required(),
      port: Joi.number().required(),
      baseUrl: Joi.string().required(),
      baseUri: Joi.string().required(),
      docsUri: Joi.string().required()
    })
    const { error } = schema.validate(values, { abortEarly: false })
    if (error) {
      throw new Error(error.message)
    }
    return values
  })
