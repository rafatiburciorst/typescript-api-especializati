"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_repository_1 = require("../repositories/product.repository");
class ProductController {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.findAll();
            return res.status(200).json({
                data: products
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productRepository.create(req.body);
                return res.status(201).json({
                    data: product
                });
            }
            catch (errors) {
                return res.status(422).json({
                    errors
                });
            }
        });
        this.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productRepository.findOne(req.params.id);
                return res.status(200).json({
                    data: product
                });
            }
            catch (error) {
                return res.status(422).json({
                    errors: 'Product not found'
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productRepository.update(req.params.id, req.body);
                return res.status(201).json({
                    data: product
                });
            }
            catch (errors) {
                return res.status(422).json({
                    errors
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.productRepository.delete(req.params.id);
            return res.json({
                message: 'Deleted'
            });
        });
        this.productRepository = new product_repository_1.ProductRepository;
    }
}
exports.default = new ProductController();
