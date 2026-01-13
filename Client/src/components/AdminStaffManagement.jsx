// components/AdminStaffManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminStaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const fetchAllStaff = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaffList(res.data);
    } catch (error) {
      console.error("Fetch staff error:", error);
      alert("Failed to fetch staff");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = (newStaff) => {
    setStaffList((prev) => [newStaff, ...prev]);
    setShowAddModal(false);
  };

  const handleUpdateStaff = (updatedStaff) => {
    setStaffList((prev) =>
      prev.map((staff) =>
        staff._id === updatedStaff._id ? updatedStaff : staff
      )
    );
    setEditingStaff(null);
  };

  const handleDeleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/staff/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaffList((prev) => prev.filter((staff) => staff._id !== id));
      alert("Staff deleted successfully");
    } catch (error) {
      console.error("Delete staff error:", error);
      alert(error.response?.data?.message || "Failed to delete staff");
    }
  };

  const styles = {
    container: {
      padding: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    title: {
      margin: 0,
      fontSize: "28px",
    },
    addButton: {
      padding: "12px 24px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "15px",
    },
    staffName: {
      margin: 0,
      fontSize: "20px",
      fontWeight: "600",
    },
    badge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: "bold",
    },
    adminBadge: {
      backgroundColor: "#6f42c1",
      color: "#fff",
    },
    staffBadge: {
      backgroundColor: "#17a2b8",
      color: "#fff",
    },
    infoRow: {
      marginBottom: "8px",
      fontSize: "14px",
      color: "#666",
    },
    statusBadge: {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "bold",
      marginTop: "10px",
    },
    available: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    working: {
      backgroundColor: "#fff3cd",
      color: "#856404",
    },
    off: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    actionButtons: {
      display: "flex",
      gap: "8px",
      marginTop: "15px",
    },
    editButton: {
      flex: 1,
      padding: "8px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    deleteButton: {
      flex: 1,
      padding: "8px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    inactiveCard: {
      opacity: 0.6,
      backgroundColor: "#f8f9fa",
    },
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "40px" }}>Loading staff...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Staff Management ({staffList.length})</h2>
        <button onClick={() => setShowAddModal(true)} style={styles.addButton}>
          + Add Staff
        </button>
      </div>

      <div style={styles.grid}>
        {staffList.map((staff) => (
          <div
            key={staff._id}
            style={{
              ...styles.card,
              ...(staff.isActive === false ? styles.inactiveCard : {}),
            }}
          >
            <div style={styles.cardHeader}>
              <h3 style={styles.staffName}>{staff.fullName}</h3>
              <span
                style={{
                  ...styles.badge,
                  ...(staff.role === "admin"
                    ? styles.adminBadge
                    : styles.staffBadge),
                }}
              >
                {staff.role.toUpperCase()}
              </span>
            </div>

            <div style={styles.infoRow}>
              <strong>Username:</strong> {staff.username}
            </div>
            <div style={styles.infoRow}>
              <strong>Email:</strong> {staff.email}
            </div>
            {staff.phone && (
              <div style={styles.infoRow}>
                <strong>Phone:</strong> {staff.phone}
              </div>
            )}

            <div>
              <span
                style={{
                  ...styles.statusBadge,
                  ...(staff.availability === "available"
                    ? styles.available
                    : staff.availability === "working"
                    ? styles.working
                    : styles.off),
                }}
              >
                {staff.availability.toUpperCase()}
              </span>
              {staff.isActive === false && (
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    marginLeft: "8px",
                  }}
                >
                  INACTIVE
                </span>
              )}
            </div>

            <div style={styles.actionButtons}>
              <button
                onClick={() => setEditingStaff(staff)}
                style={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteStaff(staff._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddStaffModal
          onAdd={handleAddStaff}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingStaff && (
        <EditStaffModal
          staff={editingStaff}
          onUpdate={handleUpdateStaff}
          onClose={() => setEditingStaff(null)}
        />
      )}
    </div>
  );
}

// Add Staff Modal Component
function AddStaffModal({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    role: "staff",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/staff/register",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAdd(res.data);
      alert("Staff added successfully");
    } catch (error) {
      console.error("Add staff error:", error);
      alert(error.response?.data?.message || "Failed to add staff");
    } finally {
      setLoading(false);
    }
  };

  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "30px",
      maxWidth: "500px",
      width: "90%",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
    },
    button: {
      flex: 1,
      padding: "12px",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Add New Staff</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            style={modalStyles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={modalStyles.input}
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            style={modalStyles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={modalStyles.input}
            required
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={modalStyles.input}
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={modalStyles.input}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          <div style={modalStyles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              style={{ ...modalStyles.button, backgroundColor: "#6c757d", color: "#fff" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...modalStyles.button,
                backgroundColor: "#28a745",
                color: "#fff",
              }}
            >
              {loading ? "Adding..." : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Staff Modal Component
function EditStaffModal({ staff, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    fullName: staff.fullName,
    email: staff.email,
    phone: staff.phone || "",
    role: staff.role,
    availability: staff.availability,
    isActive: staff.isActive,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/staff/${staff._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(res.data);
      alert("Staff updated successfully");
    } catch (error) {
      console.error("Update staff error:", error);
      alert(error.response?.data?.message || "Failed to update staff");
    } finally {
      setLoading(false);
    }
  };

  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "30px",
      maxWidth: "500px",
      width: "90%",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
    },
    checkbox: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
    },
    button: {
      flex: 1,
      padding: "12px",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Edit Staff</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            style={modalStyles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={modalStyles.input}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={modalStyles.input}
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={modalStyles.input}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            style={modalStyles.input}
          >
            <option value="available">Available</option>
            <option value="working">Working</option>
            <option value="off">Off</option>
          </select>

          <div style={modalStyles.checkboxContainer}>
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              style={modalStyles.checkbox}
            />
            <label htmlFor="isActive">Account is active</label>
          </div>

          <div style={modalStyles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              style={{ ...modalStyles.button, backgroundColor: "#6c757d", color: "#fff" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...modalStyles.button,
                backgroundColor: "#007bff",
                color: "#fff",
              }}
            >
              {loading ? "Updating..." : "Update Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminStaffManagement;