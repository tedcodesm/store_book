import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization || req.header("Authorization");
console.log("Authorization header:", req.headers.authorization);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No authentication token – access denied" });
    }

    const token = authHeader.split(" ")[1]; // everything after “Bearer”

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const user = await User.findById(decoded.userId || decoded.id).select(
      "-password"
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "User linked to token no longer exists" });
    }

    req.user = user; // attach to request
    next();
  } catch (err) {
    console.error("auth middleware error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protectRoute;
