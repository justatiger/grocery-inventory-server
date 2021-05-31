import express from "express";
const router = express.Router();

import { loginUser, registerUser } from "../controllers/authControllers.js";

router.route("/login").post(loginUser);

router.route("/").post(registerUser);

export default router;
