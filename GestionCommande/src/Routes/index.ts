import express from "express";

const router=express.Router();
// passer le router comme parametres
require("./UserRoutes")(router);
export default router;