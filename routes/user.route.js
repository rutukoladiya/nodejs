// Add role field to user schema

// Build /admin route accessible only to admins

// Create a protect middleware for token check

// Create an authorizeRoles middleware for role check

// Test both user/admin access

import express from "express";
import { register, login } from "../controllers/user.controller.js";
import { authorizeRoles, protect } from "../middleware/auth.middleware.js";
import { refershAccessToken } from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);

router.post("/login", loginValidator, validateRequest, login);

router.get("/profile", protect, (req, res) => {
  res.json({ message: "You are logged in!", user: req.user });
});

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/refresh-token", refershAccessToken);

export default router;
