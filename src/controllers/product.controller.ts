import { Request, Response } from "express"

import { Product } from "../entities/product.entity"
import { ProductRepository } from "../repositories/product.repository"

class ProductController {

  private productRepository: ProductRepository
  constructor() {
    this.productRepository = new ProductRepository
  }

  findAll = async (req: Request, res: Response): Promise<Response<Product[]>> => {
    const products = await this.productRepository.findAll()
    return res.status(200).json({
      data: products
    })
  }


  create = async (req: Request, res: Response): Promise<Response<Product | any[]>> => {
    try {
      const product = await this.productRepository.create(req.body)
      return res.status(201).json({
        data: product
      })
    } catch (errors) {
      return res.status(422).json({
        errors
      })
    }
  }


  findOne = async (req: Request, res: Response): Promise<Response<Product>> => {
    try {
      const product = await this.productRepository.findOne(req.params.id)
      return res.status(200).json({
        data: product
      })
    } catch (error) {
      return res.status(422).json({
        errors: 'Product not found'
      })
    }
  }




  update = async (req: Request, res: Response): Promise<Response<Product | any[]>> => {

    try {
      const product = await this.productRepository.update(req.params.id, req.body)
      return res.status(201).json({
        data: product
      })
    } catch (errors) {
      return res.status(422).json({
        errors
      })
    }
  }


  delete = async (req: Request, res: Response): Promise<Response> => {
    this.productRepository.delete(req.params.id)
    return res.json({
      message: 'Deleted'
    })
  }
}


export default new ProductController()
