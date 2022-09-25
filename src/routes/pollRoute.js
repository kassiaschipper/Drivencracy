import express from "express";
import { createPoll, showPolls, showPollChoices, showResult } from "../controllers/pollController.js"
import { pollValidation } from "../middlewares/pollMiddlewares.js"

const router = express.Router();
router.post("/poll", pollValidation, createPoll);
router.get("/poll", showPolls);
router.get("/poll/:id/choice", showPollChoices);
router.get("/poll/:id/result", showResult);

export default router;