import { IsString, IsNotEmpty, Length, IsNumber, IsOptional } from "class-validator"


export class UpdateProductDto {

  @IsString()
  @IsOptional()
  @Length(3, 100)
  name: string

  @IsString()
  @IsOptional()
  @Length(3, 100)
  description: string

  @IsNumber()
  @IsOptional()
  weight: number
}
