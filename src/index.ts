import 'module-alias/register'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import '@/database/data-source'
import routes from '@/routes'

const PORT = process.env.PORT || 3000


const app: Application = express()
app.use(express.json())
app.use(cors())
app.use(routes)



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})
