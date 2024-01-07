import { addCommande,GetCommandeDispo,AddLivraison,
         GetCommandeByIdUser,GetLivraisonByNumCommande,
         ChangerLocationLivreur,
         getCommandesByClientPaginate,
         GetCommandsWaiting,
         RefusedCommand,
         AcceptCommand,
         deleteCommande,
         deleteCommandeById,
         UpdateNameFacture,
         CalculerWalletSupplier} from "../Controller/CommandeController"

import config from "../config/KeycloackConfig";

module.exports=(router:any)=>{
    //,config.keycloak.protect(),
    router.post('/AddCommande',addCommande);
    router.get('/GetCommandeDispo',GetCommandeDispo);
    router.post('/AddLivraison',AddLivraison);
    router.put('/AcceptCommand/:num',AcceptCommand);
    router.put('/RefusedCommand/:num',RefusedCommand);
    router.get('/GetCommandsWaiting',GetCommandsWaiting);
    router.delete('/DeleteCommande/:id', deleteCommande);
    router.get('/GetCommandeByIdUser/:Client_id',GetCommandeByIdUser);
    router.get('/GetLivraisonByNumCommande/:num',GetLivraisonByNumCommande);
    router.put('/ChangerLocationLivreur/:num',ChangerLocationLivreur);
    router.get('/getCommandesByClient',getCommandesByClientPaginate);
    router.delete('/deleteCommande',deleteCommandeById);
    router.put('/UpdateNameFacture/:num',UpdateNameFacture)
    router.post('/CalculerWalletSupplier',CalculerWalletSupplier)
}