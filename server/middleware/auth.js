import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token; // fixed typo
        if (!token) {
            return res.json({ success: false, message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userID).select("-password");

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        req.user = user; // set user on request
        next(); // call next middleware
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// controller to check if user is authenticated
export const checkAuth = async (req, res) => {
    res.json({ success: true, user: req.user });
}