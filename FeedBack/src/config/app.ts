
import express from "express";

const BodyParser=require("body-parser")
const cors=require("cors");

const app=express();
//app.use(cors());
app.use(BodyParser.json());



export default app;