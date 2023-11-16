import { addCommande,GetCommandeDispo, AddLivraison,GetCommandeByIdUser} from "../Controller/CommandeController"

module.exports=(router:any)=>{
    router.post('/AddCommande',addCommande);
    router.get('/GetCommandeDispo',GetCommandeDispo);
    router.post('/AddLivraison',AddLivraison);
    router.get('/GetCommandeByIdUser/:Client_id',GetCommandeByIdUser);
}