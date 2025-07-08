import { Router } from "express";
import { createTicket, getUserTickets } from "../controllers/ticket.controllers.js";
import { userMiddleware } from "../middlewares/user-auth.middleware.js";

const router = Router();

router.route("/create").post(userMiddleware,createTicket);
router.route("/my-ticket").get(userMiddleware,getUserTickets)

export default router;
