import { findAll } from "../Controller/productController"

module.exports=(router:any)=>{
    router.get("/GetProducts",findAll)
}