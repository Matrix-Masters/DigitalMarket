
import { AddNotif} from "../controller/NotificationController"

module.exports=(router:any)=>{
    router.post("/AddNotif",AddNotif)
}