import express from 'express';
import {
  getOverviewData,
  getRevenueData,
  getTotalRevenue,
  getTransactionData,
  getOrderFulfillmentRatio
} from '../controllers/analyticsController';

const router = express.Router();

router.get('/overview', getOverviewData);
router.get('/revenue/:period', getRevenueData); // period can be day, week, month, year
router.get('/total-revenue/:period', getTotalRevenue); // period can be day, week, month, year
router.get('/transactions/:period', getTransactionData); // period can be day, week, month, year
router.get('/fulfillment-ratio', getOrderFulfillmentRatio);

export default router;
