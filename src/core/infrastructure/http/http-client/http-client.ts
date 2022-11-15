import _ from 'lodash'
import axios, { AxiosInstance } from 'axios'
import { HttpClientResponse } from './http-client-response'
import { HttpClientRequest } from './http-client-request'
import { HttpStatus } from '@nestjs/common'

export class HttpClient {
  protected readonly axios: AxiosInstance

  public constructor(public readonly baseUrl = '') {
    this.axios = axios.create({
      baseURL: baseUrl,
      validateStatus: (status) => this.isValidStatus(status)
    })
  }

  public async request(request: HttpClientRequest): Promise<HttpClientResponse> {
    const response = await this.axios.request(request)

    return new HttpClientResponse(response.status, response.data, response.headers)
  }

  protected isValidStatus(status: number): boolean {
    return status < HttpStatus.INTERNAL_SERVER_ERROR
  }
}
