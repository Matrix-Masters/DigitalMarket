"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class ConnectMongo {
    constructor(uri) {
        this.uri = uri;
    }
    ConnectToBd() {
        return mongoose_1.default
            .connect(this.uri)
            .then(() => {
            console.log('Connected successfully to MongoDB !');
        })
            .catch((err) => {
            console.error('Connected failed to MongoDB !', err);
        });
    }
    server(app, port) {
        app.get('/', (req, res) => {
            res.send("<h1>Hello from server</h1>");
        });
        app.listen(port, () => {
            console.log("Server is running on port " + port);
        });
    }
}
exports.default = ConnectMongo;
