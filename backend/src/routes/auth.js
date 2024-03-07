//routers for client users
const express = require("express");
const {
  signup,
  signin,
  resetPassword,
  newPassword,
} = require("../controller/auth");
const {
  isRequestValidated,
  validateSigninRequest,
  validateSignupRequestUser,
} = require("../validators/auth");
const router = express.Router();

//backend routes for user auth
router.post("/signup", validateSignupRequestUser, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/reset-password", resetPassword);
router.post("/new-password", newPassword);

module.exports = router;















/* const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../Validators/auth');
const router = express.Router();


router.post('/signup', signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router; */