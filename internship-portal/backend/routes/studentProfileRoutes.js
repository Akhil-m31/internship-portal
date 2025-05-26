import express from "express";
import {
  createStudentProfile,
  getMyStudentProfile,
  updateStudentProfile,
} from "../controllers/studentProfileController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createStudentProfile);
router.get("/me", isAuthenticated, getMyStudentProfile);
router.put("/update", isAuthenticated, updateStudentProfile);

export default router; 