import app from "./config/app";
import ConnectMongo from "./config/DbConnect"
import router from "./Router";
const eurekaHelper = require('./Setup_Euruka');
const PORT = process.env.PORT || 3001;
const uri:string='mongodb://127.0.0.1:27017/GestionFeedBack'
const connect=new ConnectMongo(uri);

 connect.ConnectToBd().then(()=>{
   app.use("/FeedBack",router);
   connect.server(app,PORT);
   eurekaHelper.registerWithEureka('feedBack-service', PORT);//enregistrer dans Eureka
 }).catch((error:any)=>{
   console.log(error);
 })


