// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import Staff from "../model/staff.model.js";

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ 
        message: "Not authorized, no token provided" 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists and is active
    const user = await Staff.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ 
        message: "User no longer exists" 
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ 
        message: "Account has been deactivated" 
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ 
      message: "Invalid or expired token" 
    });
  }
};

// Admin only middleware
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ 
      message: "Access denied. Admin privileges required." 
    });
  }
  next();
};

// Staff can only access their own data
export const staffOwner = (req, res, next) => {
  // Admin can access any staff data
  if (req.user.role === "admin") {
    return next();
  }

  // Staff can only access their own data
  if (req.params.id !== req.user._id.toString()) {
    return res.status(403).json({ 
      message: "You can only access your own data" 
    });
  }

  next();
};