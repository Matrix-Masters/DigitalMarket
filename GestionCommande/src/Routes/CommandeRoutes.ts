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
    router.post('/AddCommande',config.keycloak.protect(),addCommande);
    router.get('/GetCommandeDispo',config.keycloak.protect(),GetCommandeDispo);
    router.post('/AddLivraison',config.keycloak.protect(),AddLivraison);
    router.put('/AcceptCommand/:num',config.keycloak.protect(),AcceptCommand);
    router.put('/RefusedCommand/:num',config.keycloak.protect(),RefusedCommand);
    router.get('/GetCommandsWaiting',config.keycloak.protect(),GetCommandsWaiting);
    router.delete('/DeleteCommande/:id',config.keycloak.protect(), deleteCommande);
    router.get('/GetCommandeByIdUser/:Client_id',config.keycloak.protect(),GetCommandeByIdUser);
    router.get('/GetLivraisonByNumCommande/:num',config.keycloak.protect(),GetLivraisonByNumCommande);
    router.put('/ChangerLocationLivreur/:num',config.keycloak.protect(),ChangerLocationLivreur);
    router.get('/getCommandesByClient',config.keycloak.protect(),getCommandesByClientPaginate);
    router.delete('/deleteCommande',config.keycloak.protect(),deleteCommandeById);
    router.put('/UpdateNameFacture/:num',config.keycloak.protect(),UpdateNameFacture)
    router.post('/CalculerWalletSupplier',config.keycloak.protect(),CalculerWalletSupplier)
}