import { addCommande,GetCommandeDispo, AddLivraison, AcceptCommand,GetCommandsWaiting,RefusedCommand,deleteCommande} from "../Controller/CommandeController"

module.exports=(router:any)=>{
    router.post('/AddCommande',addCommande);
    router.get('/GetCommandeDispo',GetCommandeDispo);
    router.post('/AddLivraison',AddLivraison);
    router.put('/AcceptCommand/:num',AcceptCommand);
    router.put('/RefusedCommand/:num',RefusedCommand);
    router.get('/GetCommandsWaiting',GetCommandsWaiting);
    router.delete('/DeleteCommande/:id', deleteCommande);

}