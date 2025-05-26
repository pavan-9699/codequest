// routes/question.js
import express from "express";
import { Askquestion, getallquestion, deletequestion, votequestion, getNotifications } from "../controller/Question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/Ask", auth, Askquestion);
router.get("/get", getallquestion);
router.delete("/delete/:id", auth, deletequestion);
router.patch("/vote/:id", auth, votequestion);
router.get("/notifications", auth, getNotifications); // New endpoint

export default router;