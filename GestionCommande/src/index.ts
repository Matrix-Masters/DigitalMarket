import app from "./config/app";
import ConnectMongo from "./config/DbConnect"
import router from "./Routes";
const eurekaHelper = require('./Setup_Euruka');
const PORT = process.env.PORT || 3000;
const uri:string='mongodb://127.0.0.1:27017/GestionCommande'
const connect=new ConnectMongo(uri);

 connect.ConnectToBd().then(()=>{
   app.use("/Commande",router);
   connect.server(app,PORT);
   eurekaHelper.registerWithEureka('GestionCommande-service', PORT);//enregistrer dans Eureka
 }).catch((error:any)=>{
   console.log(error);
 })


