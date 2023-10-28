import express from "express";

const router=express.Router();

require("./NotifRouter")(router);

export default router;