import express from 'express';
import * as StoreController from '../controllers/StoreController.js';

const router = express.Router();

// CREATE - Add a new store
router.post('/create-store', StoreController.createStore);

// READ - Get all stores
router.get('/stores', StoreController.getStores);

// READ - Get a store by ID
router.get('/stores/id/:id', StoreController.getStoreById);

// UPDATE - Update a store
router.post('/update-store/id/:id', StoreController.updateStore);

// DELETE - Delete a store
router.delete('/stores/id/:id', StoreController.deleteStore);

// ADD COUPONS - Add coupons to a store
router.post('/stores/:id/coupons', StoreController.addCoupons);

// SEARCH - Search for stores
router.get('/search', StoreController.searchStores);

export default router;
