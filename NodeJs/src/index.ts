import app from "./config/app";
import ConnectMongo from "./config/DbConnect"
const eurekaHelper = require('./Setup_Euruka');
const PORT = process.env.PORT || 3000;
const uri:string='mongodb://localhost:27017/biblio'
const connect=new ConnectMongo(uri);

 connect.ConnectToBd().then(()=>{
   connect.server(app,PORT);
   eurekaHelper.registerWithEureka('nodeJs-service', PORT);//enregistrer dans Eureka
 }).catch((error:any)=>{
   console.log(error);
 })


