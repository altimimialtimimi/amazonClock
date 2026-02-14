import { Router } from "express";
import { getAllProducts, getProductById, createProduct } from "../controllers/productController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authenticateToken, createProduct); // Protected route

export default router;
