"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../entities/product.entity");
require("reflect-metadata");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "express-node",
    synchronize: true,
    logging: true,
    entities: [
        product_entity_1.Product
    ],
    subscribers: [],
    migrations: [],
});
AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error));
exports.default = AppDataSource;
