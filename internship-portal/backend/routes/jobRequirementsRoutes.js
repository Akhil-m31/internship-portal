import express from "express";
import {
  createJobRequirements,
  getJobRequirements,
  updateJobRequirements,
} from "../controllers/jobRequirementsController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:jobId/create", isAuthenticated, createJobRequirements);
router.get("/:jobId", getJobRequirements);
router.put("/:jobId/update", isAuthenticated, updateJobRequirements);

export default router; 