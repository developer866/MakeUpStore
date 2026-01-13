// routes/product.route.js
import { Router } from "express";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controller/products.controller.js";

const router = Router();

// Public route (anyone can view products)
router.get("/", getAllProducts);

// Protected routes (admin only)
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;