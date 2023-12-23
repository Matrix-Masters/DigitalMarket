import app from "./config/app";
import ConnectMongo from "./config/DbConnect"
import router from "./Routes";
const eurekaHelper = require('./Setup_Euruka');
const PORT = process.env.PORT || 3000;
const uri:string='mongodb://127.0.0.1:27017/GestionCommande'
const connect=new ConnectMongo(uri);
var socket = require('socket.io');

var io : any;

 connect.ConnectToBd().then(()=>{
   app.use("/Commande",router);
  //  connect.server(app,PORT);
    io = socket(connect.server(app,PORT), {
    cors: {
      origin: "http://localhost:4200", 
      methods: ["GET", "POST"]
    }
  });
  
  io.on('connection', (socket:any) => {

    console.log(`New connection ${socket.id}`)

    
    socket.on('chat', function(data:any){
        io.sockets.emit('chat', data);
    });

    
    // socket.on('typing', function(data:any){
    //     io.sockets.emit('typing', data);
    // });

});

   eurekaHelper.registerWithEureka('GestionCommande-service', PORT);//enregistrer dans Eureka
 }).catch((error:any)=>{
   console.log(error);
 })


export default io;