import { addCommande,GetCommandeDispo,AddLivraison,
         GetCommandeByIdUser,GetLivraisonByNumCommande,
         ChangerLocationLivreur} from "../Controller/CommandeController"

module.exports=(router:any)=>{
    router.post('/AddCommande',addCommande);
    router.get('/GetCommandeDispo',GetCommandeDispo);
    router.post('/AddLivraison',AddLivraison);
    router.get('/GetCommandeByIdUser/:Client_id',GetCommandeByIdUser);
    router.get('/GetLivraisonByNumCommande/:num',GetLivraisonByNumCommande);
    router.put('/ChangerLocationLivreur/:num',ChangerLocationLivreur);
}