import { addProduct, FindProductWithoutProduct,LibererProduct ,UpdateIdProducts,RejectProduct} from "../Controller/ProductController"

module.exports=(router:any)=>{
    router.get("/GetProducts",FindProductWithoutProduct),
    router.post("/addProduct",addProduct)
    router.put("/LibererProduct/:id",LibererProduct)
    router.put("/UpdateIdProducts/:id",UpdateIdProducts)
    router.put("/RejectProduct/:id",RejectProduct)
}