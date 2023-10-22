import express from "express";

const router=express.Router();
// passer le router comme parametres
require("./ProductsRoutes")(router);
require("./CategoryRoutes")(router);

export default router;