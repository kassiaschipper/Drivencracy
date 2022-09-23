import express from "express";

import { createPoll } from "../controllers/pollController.js"
import { pollValidation } from "../middlewares/pollMiddlewares.js"

const router = express.Router();
router.post("/poll", pollValidation, createPoll);

export default router;