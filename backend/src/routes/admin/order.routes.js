const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  updateOrder,
  getCustomerOrders,
  getAddressByUser,
} = require("../../controller/admin/order.admin");
const router = express.Router();

//backend routes for admin order
router.post("/order/update", requireSignin, adminMiddleware, updateOrder);

router.post(
  "/order/getCustomerOrders",
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

router.get("/order/getAddressByUser/:id", getAddressByUser);

module.exports = router;










/* const express = require('express');
const { upload, requireSignin, adminMiddleware } = require('../../common-middleware');
const { createPage, getPage } = require('../../controller/admin/page');
const router = express.Router();

router.post(`/page/create`, requireSignin, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage)

router.get(`/page/:category/:type`, getPage);

module.exports = router; */