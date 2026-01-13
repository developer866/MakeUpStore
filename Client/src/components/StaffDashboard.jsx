// components/StaffDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StaffDashboard() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [availability, setAvailability] = useState("off");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStaffProfile();
  }, []);

  const fetchStaffProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/staff/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStaff(res.data);
      setAvailability(res.data.availability);
    } catch (error) {
      console.error("Fetch profile error:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const updateAvailabilityStatus = async () => {
    setUpdating(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        "http://localhost:5000/api/staff/availability",
        { availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStaff(res.data.staff);
      alert("Availability updated successfully!");
    } catch (error) {
      console.error("Update availability error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update availability";
      setError(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
    },
    header: {
      backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      margin: 0,
      fontSize: "24px",
      color: "#333",
    },
    logoutButton: {
      padding: "10px 20px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    },
    content: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "30px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    profileSection: {
      marginBottom: "30px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#555",
    },
    value: {
      fontSize: "16px",
      color: "#333",
      marginBottom: "15px",
    },
    availabilitySection: {
      borderTop: "1px solid #ddd",
      paddingTop: "30px",
    },
    sectionTitle: {
      marginTop: 0,
      marginBottom: "20px",
      fontSize: "20px",
      color: "#333",
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      backgroundColor: "#fff",
      cursor: "pointer",
    },
    updateButton: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
    statusBadge: {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "bold",
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
    error: {
      color: "#d9534f",
      marginBottom: "15px",
      padding: "12px",
      backgroundColor: "#f8d7da",
      border: "1px solid #f5c6cb",
      borderRadius: "4px",
    },
  };

  if (loading) {
    return (
      <div style={{ ...styles.container, padding: "40px", textAlign: "center" }}>
        Loading...
      </div>
    );
  }

  if (!staff) {
    return (
      <div style={{ ...styles.container, padding: "40px", textAlign: "center" }}>
        Failed to load profile
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "available":
        return styles.available;
      case "working":
        return styles.working;
      case "off":
        return styles.off;
      default:
        return {};
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Staff Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>

      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.profileSection}>
            <h2 style={styles.sectionTitle}>Profile Information</h2>

            <div>
              <span style={styles.label}>Full Name:</span>
              <div style={styles.value}>{staff.fullName}</div>
            </div>

            <div>
              <span style={styles.label}>Username:</span>
              <div style={styles.value}>{staff.username}</div>
            </div>

            <div>
              <span style={styles.label}>Email:</span>
              <div style={styles.value}>{staff.email}</div>
            </div>

            {staff.phone && (
              <div>
                <span style={styles.label}>Phone:</span>
                <div style={styles.value}>{staff.phone}</div>
              </div>
            )}

            <div>
              <span style={styles.label}>Current Status:</span>
              <div>
                <span
                  style={{
                    ...styles.statusBadge,
                    ...getStatusStyle(staff.availability),
                  }}
                >
                  {staff.availability.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div style={styles.availabilitySection}>
            <h2 style={styles.sectionTitle}>Update Availability</h2>

            {error && <div style={styles.error}>{error}</div>}

            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              style={styles.select}
            >
              <option value="available">Available</option>
              <option value="working">Working</option>
              <option value="off">Off</option>
            </select>

            <button
              onClick={updateAvailabilityStatus}
              disabled={updating || availability === staff.availability}
              style={{
                ...styles.updateButton,
                ...(updating || availability === staff.availability
                  ? styles.buttonDisabled
                  : {}),
              }}
            >
              {updating ? "Updating..." : "Update Availability"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;