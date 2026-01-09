import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controller/products.controller.js";   

const router = Router();

router.get('/products', getAllProducts);
router.post('/createProduct', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get("product/test", (req, res) => {
    res.send("Products route is working!");
})
export default router;