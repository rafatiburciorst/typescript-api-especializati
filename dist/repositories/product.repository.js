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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const class_validator_1 = require("class-validator");
const data_source_1 = __importDefault(require("../database/data-source"));
const create_product_dto_1 = require("../dto/create-product.dto");
const update_product_dto_1 = require("../dto/update-product.dto");
const product_entity_1 = require("../entities/product.entity");
class ProductRepository {
    constructor() {
        this.repository = data_source_1.default.getRepository(product_entity_1.Product);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = new create_product_dto_1.CreateProductDto;
            payload.name = data.name;
            payload.description = data.description;
            payload.weight = data.weight;
            const errors = yield (0, class_validator_1.validate)(payload);
            if (errors.length > 0) {
                return errors;
            }
            const product = this.repository.create(payload);
            return this.repository.save(product);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.repository.findOneOrFail({ where: { id } });
            return product;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.repository.findOneOrFail({ where: { id } });
            if (product) {
                const payload = new update_product_dto_1.UpdateProductDto;
                payload.name = data.name;
                payload.description = data.description;
                payload.weight = data.weight;
                const errors = yield (0, class_validator_1.validate)(payload);
                if (errors.length > 0) {
                    return errors;
                }
                const newProduct = this.repository.merge(product, payload);
                return this.repository.save(newProduct);
            }
            return undefined;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.repository.findOneOrFail({ where: { id } });
                yield this.repository.softDelete({ id });
            }
            catch (errors) {
                throw new Error();
            }
        });
    }
}
exports.ProductRepository = ProductRepository;
