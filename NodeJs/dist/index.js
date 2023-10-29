"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
const DbConnect_1 = __importDefault(require("./config/DbConnect"));
const Routes_1 = __importDefault(require("./Routes"));
const eurekaHelper = require('./Setup_Euruka');
const PORT = process.env.PORT || 3000;
const uri = 'mongodb://0.0.0.0:27017/DigitalMarket';
const connect = new DbConnect_1.default(uri);
connect.ConnectToBd().then(() => {
    app_1.default.use("/node", Routes_1.default);
    connect.server(app_1.default, PORT);
    eurekaHelper.registerWithEureka('nodeJs-service', PORT); //enregistrer dans Eureka
}).catch((error) => {
    console.log(error);
});
