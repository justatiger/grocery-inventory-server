import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  deleteMultiProduct,
  updateProduct,
} from "../controllers/productControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all products from db
router.get("/", protect, getAllProducts);

// GET a product from db
router.get("/:id", protect, getProductById);

// CREATE a product
router.post("/", protect, createProduct);

// UPDATE a product
router.patch("/:id", protect, updateProduct);

// DELETE by id
router.delete("/:id", protect, deleteProduct);

// BATCH DELETE
router.route("/delete").post(protect, deleteMultiProduct);

export default router;
