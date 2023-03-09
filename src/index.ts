import 'module-alias/register'
import express, { Application, Request, Response } from 'express'
import productController from '@/controllers/product.controller'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import './data-source'

const PORT = process.env.PORT || 3000


const app: Application = express()
app.use(express.json())
app.use(cors())

app.get('/api/products', productController.findAll)
app.post('/api/products', productController.create)
app.get('/api/products/:id', productController.findOne)
app.patch('/api/products/:id', productController.update)
app.delete('/api/products/:id', productController.delete)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' })
})





app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})
