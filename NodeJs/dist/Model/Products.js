"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let ProductSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: Number,
        required: false,
        default: null
    }
});
ProductSchema.plugin(mongoose_paginate_1.default);
const product = mongoose_1.default.model("product", ProductSchema);
exports.default = product;
