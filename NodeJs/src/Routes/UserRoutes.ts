
import { getAllUsers ,AddUser,GetUserByEmail} from "../Controller/UserController"

module.exports=(router:any)=>{
    router.get("/getAllusers",getAllUsers),
    router.post("/AddUser",AddUser)
    router.get("/getByEamil/:email",GetUserByEmail)
}