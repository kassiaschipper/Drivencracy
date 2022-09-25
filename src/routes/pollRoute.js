import express from "express";
import { createPoll, showPolls } from "../controllers/pollController.js"
import { pollValidation } from "../middlewares/pollMiddlewares.js"

const router = express.Router();
router.post("/poll", pollValidation, createPoll);
router.get("/poll", showPolls);

export default router;