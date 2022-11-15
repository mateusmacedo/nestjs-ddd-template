import { ResponseType } from 'axios'

interface BasicCredentials {
  username: string
  password: string
}

export interface HttpClientRequest {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  params?: unknown
  data?: unknown
  headers?: Record<string, string>
  responseType?: ResponseType
  auth?: BasicCredentials
}
