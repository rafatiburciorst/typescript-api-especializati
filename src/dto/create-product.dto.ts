import { IsString, IsNotEmpty, Length, IsNumber } from "class-validator"
import { Product } from "../entities/product.entity"

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string

  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  description: string

  @IsNumber()
  @IsNotEmpty()
  weight: number
}
