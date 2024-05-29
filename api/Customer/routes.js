const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("./controllers");
const { hashing } = require("../../middlewares/password/password");
const passport = require("passport");

const jwt = passport.authenticate("jwt", { session: false });

// Create a new customer
router.post("/", jwt, createCustomer);

// Get all customers
router.get("/", jwt, getAllCustomers);

// Get customer by ID
router.get("/:id", jwt, getCustomerById);

// Update customer by ID
router.put("/:id", jwt, hashing, updateCustomer);

// Delete customer by ID
router.delete("/:id", jwt, deleteCustomer);

module.exports = router;
