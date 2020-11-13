const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();
const authorize = require('../middleware/authorize');
// /admin/add-product => GET
router.get('/add-product', authorize, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', authorize, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', authorize, adminController.postAddProduct);

router.get('/edit-product/:productId', authorize, adminController.getEditProduct);

router.post('/edit-product', authorize, adminController.postEditProduct);

router.post('/delete-product', authorize, adminController.postDeleteProduct);

module.exports = router;