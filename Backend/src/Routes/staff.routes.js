// routes/staff.route.js
import { Router } from "express";
import {
  registerStaff,
  loginStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updateAvailability,
  getMe,
} from "../controllers/staff.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = Router();

// ============ PUBLIC ROUTES ============
router.post("/login", loginStaff);

// ============ PROTECTED ROUTES (Any authenticated user) ============
router.get("/me", protect, getMe);

// ============ STAFF ROUTES (Staff can only update their availability) ============
router.patch("/availability", protect, updateAvailability);

// ============ ADMIN ROUTES (Admin only) ============
router.post("/register", protect, adminOnly, registerStaff);
router.get("/", protect, adminOnly, getAllStaff);
router.get("/:id", protect, adminOnly, getStaffById);
router.put("/:id", protect, adminOnly, updateStaff);
router.delete("/:id", protect, adminOnly, deleteStaff);

export default router;