import express from "express";

const router=express.Router();
// passer le router comme parametre 
require("./booksRoutes")(router);

export default router;