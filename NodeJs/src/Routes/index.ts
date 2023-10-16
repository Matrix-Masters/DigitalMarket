import express from "express";

const router=express.Router();
// passer le router comme parametres
require("./ProductsRoutes")(router);

export default router;