import { addCommande,GetCommandeDispo, AddLivraison} from "../Controller/CommandeController"

module.exports=(router:any)=>{
    router.post('/AddCommande',addCommande);
    router.get('/GetCommandeDispo',GetCommandeDispo);
    router.post('/AddLivraison',AddLivraison);
}