
import { getAllUsers ,AddUser,GetUserByEmail, AcceptUser} from "../Controller/UserController"

module.exports=(router:any)=>{
    router.get("/getAllusers",getAllUsers),
    router.post("/AddUser",AddUser)
    router.get("/getByEamil/:email",GetUserByEmail)
    router.put("/AcceptSupplier",AcceptUser)
    router.put("/RefuseSupplier",RefuseSupplier)
}