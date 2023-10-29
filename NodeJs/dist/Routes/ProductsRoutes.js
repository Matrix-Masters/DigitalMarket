"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = require("../Controller/ProductController");
module.exports = (router) => {
    router.get("/GetProducts", ProductController_1.findAll),
        router.post("/addProduct", ProductController_1.addProduct);
};
