const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get dashboard stats
router.get('/', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalBill" }
        }
      }
    ]);
    
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    
    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Format status counts into an object
    const ordersPerStatus = {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0
    };
    
    statusCounts.forEach(status => {
      if (ordersPerStatus[status._id] !== undefined) {
        ordersPerStatus[status._id] = status.count;
      }
    });
    
    res.json({
      totalOrders,
      totalRevenue,
      ordersPerStatus
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Server error fetching dashboard stats' });
  }
});

module.exports = router;
