import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  deleteMultiProduct,
  updateProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

// GET all products from db
router.get("/", getAllProducts);

// GET a product from db
router.get("/:id", getProductById);

// CREATE a product
router.post("/", createProduct);

// router.patch('/:id', updatePost);
router.patch("/:id", updateProduct);

// DELETE by id
router.delete("/:id", deleteProduct);

// BATCH DELETE
router.route("/delete").post(deleteMultiProduct);

export default router;
