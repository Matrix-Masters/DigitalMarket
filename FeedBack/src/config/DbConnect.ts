import mongoose from "mongoose";
import { Request, Response } from "express";

export default class ConnectMongo {
    constructor(private uri: string) {}

    public ConnectToBd():Promise<void> {
        return mongoose
            .connect(this.uri)
            .then(() => {
                console.log('Connected successfully to MongoDB !');
            })
            .catch((err) => {
                console.error('Connected failed to MongoDB !', err);
            });
    }

    public server(app: any, port: any): void {
        
        app.get('/', (req:Request,res:Response) => {
           res.send("<h1>Hello from Feed Back</h1>")
        })

        app.listen(port, () => {
            console.log("Server is running on port " + port);
        })

    }
}