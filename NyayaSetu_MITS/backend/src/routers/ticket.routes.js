import { Router } from "express";
import { createTicket, trackComplaint } from "../controllers/ticket.controllers.js";
import { userMiddleware } from "../middlewares/user-auth.middleware.js";

const router = Router();

router.route("/create").post(userMiddleware,createTicket);
router.route("/track/:trackNo").get(trackComplaint)

export default router;
