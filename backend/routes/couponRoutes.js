import express from 'express';
import * as CouponsController from '../controllers/CouponsController.js';

const router = express.Router();

// CREATE - Add a new coupon
router.post('/create-coupon', CouponsController.createCoupon);

// READ - Get all coupons (with optional filters)
router.get('/coupons', CouponsController.getCoupons);

// READ - Get coupon by ID
router.get('/coupons/:id', CouponsController.getCouponById);

// UPDATE - Update coupon by ID
router.post('/update-coupons/:id', CouponsController.updateCoupon);

// DELETE - Delete coupon by ID
router.get('/delete-coupons/:id', CouponsController.deleteCoupon);

// FILTER - Filter coupons by store, category, or status
router.get('/coupons/filter', CouponsController.filterCoupons);

export default router;
