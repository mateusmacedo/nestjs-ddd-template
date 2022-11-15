import { IsNumber, IsOptional, IsPositive } from 'class-validator'

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  page: number

  @IsOptional()
  @IsPositive()
  @IsNumber()
  perPage: number

  @IsOptional()
  @IsNumber()
  latitude: number

  @IsOptional()
  @IsNumber()
  longitude: number

  @IsOptional()
  @IsPositive()
  distance: number
}
