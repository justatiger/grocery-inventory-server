import express from "express";
const router = express.Router();

import { loginUser, registerUser } from "../controllers/authControllers.js";

// Route to /login for POST login action
router.route("/login").post(loginUser);

// Route to default / for POST register action
router.route("/").post(registerUser);

export default router;
