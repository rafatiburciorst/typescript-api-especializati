import { Request, Response } from "express"
import AppDataSource from "../data-source"
import { Product } from "../entities/product.entity"
import { Repository } from 'typeorm'
import { validate } from 'class-validator'
import { CreateProductDto } from "../dto/create-product.dto"
import { UpdateProductDto } from "../dto/update-product.dto"
class ProductController {


  // private productRepository: Repository<Product>
  // constructor() {
  //   this.productRepository = AppDataSource.getRepository(Product)
  // }

  async findAll(req: Request, res: Response): Promise<Response<Product[]>> {
    const productRepository = AppDataSource.getRepository(Product)
    const products = await productRepository.find()
    return res.status(200).json({
      data: products
    })
  }


  async create(req: Request, res: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product)
    const payload = new CreateProductDto

    payload.name = req.body.name
    payload.description = req.body.description
    payload.weight = req.body.weight

    const errors = await validate(payload)
    if (errors.length > 0) {
      return res.status(422).json({
        errors: errors
      })
    }

    const product = productRepository.create(payload)
    return res.status(201).json({
      data: await productRepository.save(product)
    })
  }


  async findOne(req: Request, res: Response): Promise<Response<Product>> {
    const productRepository = AppDataSource.getRepository(Product)
    const id = req.params.id

    const product = await productRepository.findOneBy({ id })

    if (product) {
      return res.status(200).json({
        data: product
      })
    }
    return res.status(404).json({
      error: `product id# ${id} not found`
    })
  }


  async update(req: Request, res: Response): Promise<Response<Product>> {
    const productRepository = AppDataSource.getRepository(Product)
    const id = req.params.id

    const product = await productRepository.findOne({ where: { id } })



    if (product) {
      const payload = new UpdateProductDto
      payload.name = req.body.name
      payload.description = req.body.description
      payload.weight = req.body.weight

      const errors = await validate(payload)
      if (errors.length > 0) {
        return res.status(422).json({
          errors: errors
        })
      }

      const newProduct = productRepository.merge(product, payload)
      return res.status(201).json({
        data: await productRepository.save(newProduct)
      })
    }
    return res.status(500).json({
      message: 'Something went wrong'
    })


  }


  async delete(req: Request, res: Response): Promise<Response> {
    const productRepository = AppDataSource.getRepository(Product)
    const id: string = req.params.id

    const product = await productRepository.findOne({ where: { id } })
    if (product) {
      await productRepository.softDelete({ id })
      return res.status(204).json({
        message: `product id# ${id} has been removed`
      })
    }
    return res.status(404).json({
      error: `product id# ${id} not found`
    })
  }
}


export default new ProductController()
