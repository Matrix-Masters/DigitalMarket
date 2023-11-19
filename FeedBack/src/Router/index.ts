import express from "express";

const router=express.Router();

require("./NotifRouter")(router);
require("./WhishlistRouter")(router);
export default router;