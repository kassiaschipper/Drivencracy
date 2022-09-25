import express from "express";
import { createChoice, addVote } from "../controllers/choiceController.js"
import { choiceValidation } from "../middlewares/choiceMiddleware.js"

const router = express.Router();
router.post("/choice", choiceValidation, createChoice);
router.post("/choice/:id/vote", addVote);

export default router;