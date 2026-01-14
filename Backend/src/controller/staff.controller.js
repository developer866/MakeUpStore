
import Staff from "../models/staff.model.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ============ AUTH ENDPOINTS ============

export const registerStaff = async (req, res) => {
  try {
    const { username, password, fullName, email, phone, role } = req.body;

    // Check if staff already exists
    const existingStaff = await Staff.findOne({
      $or: [{ username }, { email }],
    });

    if (existingStaff) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    // Create staff
    const staff = await Staff.create({
      username,
      password,
      fullName,
      email,
      phone,
      role: role || "staff",
    });

    res.status(201).json({
      _id: staff._id,
      username: staff.username,
      fullName: staff.fullName,
      email: staff.email,
      role: staff.role,
      availability: staff.availability,
      isActive: staff.isActive,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginStaff = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find staff
    const staff = await Staff.findOne({ username });

    if (!staff) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Check if active
    if (!staff.isActive) {
      return res.status(403).json({
        message: "Your account has been deactivated. Contact admin.",
      });
    }

    // Check password
    const isMatch = await staff.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Update last login
    staff.lastLogin = new Date();
    await staff.save();

    // Generate token
    const token = generateToken(staff._id, staff.role);

    res.json({
      token,
      staff: {
        _id: staff._id,
        username: staff.username,
        fullName: staff.fullName,
        email: staff.email,
        role: staff.role,
        availability: staff.availability,
        isActive: staff.isActive,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select("-password").sort("-createdAt");
    res.json(staff);
  } catch (error) {
    console.error("Get all staff error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).select("-password");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json(staff);
  } catch (error) {
    console.error("Get staff error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const updateStaff = async (req, res) => {
  try {
    const { username, fullName, email, phone, role, availability, isActive } = req.body;

    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Update fields
    if (username) staff.username = username;
    if (fullName) staff.fullName = fullName;
    if (email) staff.email = email;
    if (phone !== undefined) staff.phone = phone;
    if (role) staff.role = role;
    if (availability) staff.availability = availability;
    if (isActive !== undefined) staff.isActive = isActive;

    await staff.save();

    res.json(staff);
  } catch (error) {
    console.error("Update staff error:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};


export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    // Prevent deleting yourself
    if (staff._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    await Staff.findByIdAndDelete(req.params.id);

    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ============ STAFF ENDPOINTS ============
export const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    // Validate availability value
    if (!["available", "working", "off"].includes(availability)) {
      return res.status(400).json({
        message: "Invalid availability status",
      });
    }

    const staff = await Staff.findByIdAndUpdate(
      req.user._id,
      { availability },
      { new: true }
    ).select("-password");

    res.json({
      message: "Availability updated successfully",
      staff,
    });
  } catch (error) {
    console.error("Update availability error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getMe = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user._id).select("-password");
    res.json(staff);
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ message: error.message });
  }
};