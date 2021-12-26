const express = require('express')
const {
    orderController,
} = require('../controllers/admin');
const protectRoute = require("../middleware/authMiddleware.js");
const router = express.Router();

router
  .route("/")
  .post(protectRoute, orderController.addOrder)
  // .get(protectRoute, admin, getAllOrders);
router.route("/myorders").get(protectRoute, orderController.getLoggedInUserOrders);
router.route("/:id").get(protectRoute, orderController.getDetailOrder);
router.route("/:id/pay").put(protectRoute, orderController.updateOrderToPaid);
router.route("/:id/deliver").put(protectRoute, orderController.updateOrderToDelivered);

module.exports = router
