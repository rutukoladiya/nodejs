import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productscontrolle.js";
import { productSchema, productUpdateSchema } from "../validators/productValidator.js";
import { validateWithJoi } from "../middleware/validateWithJoi.middleware.js";

const router = express.Router();

router.post("/", validateWithJoi(productSchema), createProduct);

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", validateWithJoi(productUpdateSchema), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
