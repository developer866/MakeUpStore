// components/StaffLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/staff/login",
        formData
      );

      // Store token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.staff.role);
      localStorage.setItem("staffId", res.data.staff._id);
      localStorage.setItem("staffName", res.data.staff.fullName);

      // Redirect based on role
      if (res.data.staff.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/staff/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
    },
    card: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      margin: "0 0 30px 0",
      textAlign: "center",
      fontSize: "28px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "10px",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
    error: {
      color: "#d9534f",
      marginBottom: "15px",
      padding: "12px",
      backgroundColor: "#f8d7da",
      border: "1px solid #f5c6cb",
      borderRadius: "4px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Staff Login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
            autoComplete="username"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StaffLogin;