import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// function protect acts as a verification for login user before performing any actions. protect must be pass in the calling function
const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token by splitting
      let token = req.headers.authorization.split(" ")[1];

      // Secret string for encoding
      const decoded = jwt.verify(token, "SamuelGrocery");

      req.user = await User.findById(decoded.id).select("-password");

      // After this function has run then calls the next function/action
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export { protect };
