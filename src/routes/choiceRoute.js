import express from "express";
import { createChoice } from "../controllers/choiceController.js"
import { choiceValidation } from "../middlewares/choiceMiddleware.js"

const router = express.Router();
router.post("/choice", choiceValidation, createChoice);

export default router;