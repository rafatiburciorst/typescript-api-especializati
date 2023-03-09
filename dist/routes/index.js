"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const routes = (0, express_1.Router)();
routes.get('/api/products', product_controller_1.default.findAll);
routes.post('/api/products', product_controller_1.default.create);
routes.get('/api/products/:id', product_controller_1.default.findOne);
routes.patch('/api/products/:id', product_controller_1.default.update);
routes.delete('/api/products/:id', product_controller_1.default.delete);
routes.get('/', (_, res) => {
    res.status(200).json({
        message: 'Api Version 1'
    });
});
routes.get('*', (_, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});
exports.default = routes;
