import { DataSource } from "typeorm";

import { Product } from "../entities/product.entity";

import "reflect-metadata"

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "express-node",
  synchronize: true,
  logging: true,
  entities: [
    Product
  ],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(error))


export default AppDataSource
