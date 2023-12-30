import express from "express";
const router=express.Router();
// passer le router comme parametres
require("./CommandeRoutes")(router);
require("./UserRoutes")(router);
export default router;