const express = require("express");

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// (or register)
router.post(
  "/signup",
  validationBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

// (or signin)
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

// logout
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

// current
router.get("/current", authenticate, ctrlWrapper(ctrl.current));

// subscription
router.patch(
  "/:userId",
  authenticate,
  validationBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
