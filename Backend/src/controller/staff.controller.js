import Staff from "../models/staff.model.js";

// CREATE STAFF
export const createStaff = async (req, res) => {
  const staff = await Staff.create(req.body);
  res.status(201).json(staff);
};

// UPDATE STAFF (Admin)
export const updateStaff = async (req, res) => {
  const staff = await Staff.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(staff);
};

// DELETE STAFF
export const deleteStaff = async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ message: "Staff deleted" });
};

// GET ALL STAFF
export const getAllStaff = async (req, res) => {
  const staff = await Staff.find().select("-password");
  res.json(staff);
};
