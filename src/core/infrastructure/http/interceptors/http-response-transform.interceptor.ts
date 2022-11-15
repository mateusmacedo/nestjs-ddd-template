import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { HttpResponseProps } from '../http-response'

@Injectable()
export class HttpResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: HttpResponseProps) => {
        const { status } = data
        if (!HttpStatus[status]) throw new Error('http status code invalido.')
        delete data.status
        const dataReturn = !data?.data && !data?.error ? undefined : data
        context.switchToHttp().getResponse().status(HttpStatus[status]).json(dataReturn)
      })
    )
  }
}
