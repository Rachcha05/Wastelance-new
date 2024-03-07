const express = require("express");
const { requireSignin, userMiddleware } = require("../common-middleware");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
} = require("../controller/cart");
const router = express.Router();

//backend routes for cart
router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);

router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);

router.post(
  "/user/cart/removeItem",
  requireSignin,
  userMiddleware,
  removeCartItems
);

module.exports = router;


























/* const express = require("express");
const {
  addItemToCart,
  //addToCart,
  //getCartItems,
  //removeCartItems,
} = require("../controller/cart");
const { requireSignin, userMiddleware } = require("../common-middleware");
const router = express.Router();

router.post(
  "/user/cart/addtocart",
  requireSignin,
  userMiddleware,
  addItemToCart
);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
//router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);
//new update
/* router.post(
  "/user/cart/removeItem",
  requireSignin,
  userMiddleware,
  removeCartItems
); 

module.exports = router; */