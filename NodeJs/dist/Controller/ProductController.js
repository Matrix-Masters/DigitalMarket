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
exports.addProduct = exports.findAll = void 0;
const Products_1 = __importDefault(require("../Model/Products"));
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Products_1.default.find().exec();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.findAll = findAll;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let prod = new Products_1.default(req.body);
    try {
        yield prod.save();
        res.status(201).json(req.body);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.addProduct = addProduct;
