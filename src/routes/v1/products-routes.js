const express = require('express');
const productController = require('../../controllers/v1/products-controller');

const router = express.Router();

router.post('/create', productController.createProduct);
router.post('/update', productController.updateProduct);
router.post('/delete', productController.deleteProduct);
router.get('/get-all', productController.getProducts);
router.get('/get-by-user/:userId', productController.getProductsByUser);

module.exports = router;
