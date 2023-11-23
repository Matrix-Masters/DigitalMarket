
import { AddNotif} from "../controller/NotificationController"
import { getNotificationsByIdRecu} from "../controller/NotificationController"

module.exports=(router:any)=>{
    router.post("/AddNotif",AddNotif),
    router.get('/getNotificationsByIdRecu/:idRecu', getNotificationsByIdRecu)
}