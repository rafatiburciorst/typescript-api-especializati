import { validate } from 'class-validator'
import { Repository } from 'typeorm'

import AppDataSource from "../database/data-source";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../entities/product.entity";

export class ProductRepository {

  private readonly repository: Repository<Product>
  constructor() {
    this.repository = AppDataSource.getRepository(Product)
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find()
  }


  async create(data: CreateProductDto): Promise<Product | any[]> {

    const payload = new CreateProductDto
    payload.name = data.name
    payload.description = data.description
    payload.weight = data.weight

    const errors = await validate(payload)
    if (errors.length > 0) {
      return errors
    }

    const product = this.repository.create(payload)
    return this.repository.save(product)
  }


  async findOne(id: string): Promise<Product | undefined> {
    const product = await this.repository.findOneOrFail({ where: { id } })
    return product
  }


  async update(id: string, data: UpdateProductDto): Promise<Product | any[] | undefined> {

    const product = await this.repository.findOneOrFail({ where: { id } })

    if (product) {
      const payload = new UpdateProductDto
      payload.name = data.name
      payload.description = data.description
      payload.weight = data.weight

      const errors = await validate(payload)
      if (errors.length > 0) {
        return errors
      }

      const newProduct = this.repository.merge(product, payload)
      return this.repository.save(newProduct)
    }
    return undefined
  }

  async delete(id: string): Promise<void> {

    try {
      await this.repository.findOneOrFail({ where: { id } })
      await this.repository.softDelete({ id })
    } catch (errors: any) {
      throw new Error()
    }
  }
}
