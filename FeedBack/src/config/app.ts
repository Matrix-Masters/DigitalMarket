
import express from "express";

const BodyParser=require("body-parser")

const app=express();
app.use(BodyParser.json());

export default app;