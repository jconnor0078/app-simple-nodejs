const express = require('express');
const storesController = require('../../controllers/v1/stores-controller');

const router = express.Router();

router.post('/create', storesController.createStore);
router.post('/update', storesController.updateStore);
router.post('/delete/:storeId', storesController.deleteStore);
router.get('/get-all', storesController.getStores);
router.get('/get-by-id/:storeId', storesController.getStoreById);

module.exports = router;
