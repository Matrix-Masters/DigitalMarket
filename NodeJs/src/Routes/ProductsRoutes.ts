import { addProduct, findAll } from "../Controller/ProductController"

module.exports=(router:any)=>{
    router.get("/GetProducts",findAll),
    router.post("/addProduct",addProduct)
}