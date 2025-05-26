import express from "express";
import { getMatchedJobs } from "../controllers/matchController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobs", isAuthenticated, getMatchedJobs);

export default router; 