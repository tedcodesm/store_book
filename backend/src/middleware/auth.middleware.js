import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    //get token
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return rs.status(401).json({
        message: "No authentication token , access denied",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SESCRET);
    const user = await User.findById(decoded.userId).select("-password"); //select without the password
     if (!user) {
      return rs.status(401).json({
        message: "No authentication token , access denied",
      });}

      req.user = user;
      next();
  } catch (error) {
    console.log("authentocation error",error.message)
    res.status(401).json({message:"Token is not valid"})
  }
};

export default protectRoute;
