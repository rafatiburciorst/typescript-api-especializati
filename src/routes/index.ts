import { Request, Response, Router } from "express"

import ProductController from "../controllers/product.controller"

const routes = Router()

routes.get('/api/products', ProductController.findAll)
routes.post('/api/products', ProductController.create)
routes.get('/api/products/:id', ProductController.findOne)
routes.patch('/api/products/:id', ProductController.update)
routes.delete('/api/products/:id', ProductController.delete)

routes.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    message: 'Api Version 1'
  })
})

routes.get('*', (_: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found'
  })
})

export default routes
