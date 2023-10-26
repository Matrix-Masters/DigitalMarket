
import * as categoryController from '../Controller/CategoryController';

module.exports=(router:any)=>{
    router.get("/getCategories",categoryController.getAllCategories)
    router.post("/addCategory",categoryController.AddCategory)
    router.put("/updateCategory/:id",categoryController.UpdateCategory)
    router.delete("/deleteCategory/:id",categoryController.DeleteCategory)
}