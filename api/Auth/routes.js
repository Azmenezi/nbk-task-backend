const express = require("express");
const { login, createUser } = require("./controllers");
const passport = require("passport");
const router = express.Router();

// login
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

// create new user
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createUser
);

module.exports = router;
