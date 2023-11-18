import { addCommande,GetCommandeDispo, AddLivraison, AcceptCommand,GetCommandsWaiting} from "../Controller/CommandeController"

module.exports=(router:any)=>{
    router.post('/AddCommande',addCommande);
    router.get('/GetCommandeDispo',GetCommandeDispo);
    router.post('/AddLivraison',AddLivraison);
    router.get('/AcceptCommand/:num',AcceptCommand);
    router.get('/GetCommandsWaiting',GetCommandsWaiting);
}