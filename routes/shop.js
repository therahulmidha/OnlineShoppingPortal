const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

const authorize = require('../middleware/authorize');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', authorize, shopController.getCart);

router.post('/cart',authorize, shopController.postCart);

router.post('/cart-delete-item',authorize, shopController.postCartDeleteProduct);

router.post('/create-order',authorize, shopController.postOrder);

router.get('/orders',authorize, shopController.getOrders);

module.exports = router;
