import { addCommande } from "../Controller/CommandeController"



module.exports=(router:any)=>{
    router.post('/AddCommande',addCommande);
}