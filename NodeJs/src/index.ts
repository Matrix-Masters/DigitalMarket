import app from "./config/app";
import ConnectMongo from "./config/DbConnect"
import router from "./Routes";
const eurekaHelper = require('./Setup_Euruka');
const PORT = process.env.PORT || 3000;
const uri:string='mongodb://localhost:27017/DigitalMarket'
const connect=new ConnectMongo(uri);

 connect.ConnectToBd().then(()=>{
   app.use("/node",router);
   connect.server(app,PORT);
   eurekaHelper.registerWithEureka('nodeJs-service', PORT);//enregistrer dans Eureka
 }).catch((error:any)=>{
   console.log(error);
 })


