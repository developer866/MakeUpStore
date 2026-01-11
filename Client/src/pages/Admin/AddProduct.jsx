import React, { useState } from "react";
import axios from "axios";

function AddProduct({ onAdd }) {
  const API_URL = "http://localhost:5000/createProduct";

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
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
      const res = await axios.post(API_URL, {
        ...formData,
        productPrice: Number(formData.productPrice), // Convert to number
      });

      alert("Product added successfully");

      // Update UI in Admin with the response from backend
      if (onAdd && res.data) {
        onAdd(res.data);
      }

      // Reset form
      setFormData({
        productName: "",
        productDescription: "",
        productPrice: "",
        productCategory: "",
      });
    } catch (error) {
      console.error("Add product error:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to add product";
      setError(errorMessage);
      alert(`Failed to add product: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    form: {
      maxWidth: "500px",
      margin: "30px auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
    textarea: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      minHeight: "100px",
      resize: "vertical",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
    error: {
      color: "#d9534f",
      marginBottom: "15px",
      padding: "10px",
      backgroundColor: "#f8d7da",
      border: "1px solid #f5c6cb",
      borderRadius: "4px",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={{ marginTop: 0, marginBottom: "20px", textAlign: "center" }}>
        Add New Product
      </h2>

      {error && <div style={styles.error}>{error}</div>}

      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={formData.productName}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <textarea
        name="productDescription"
        placeholder="Product Description"
        value={formData.productDescription}
        onChange={handleChange}
        style={styles.textarea}
        required
      />

      <input
        type="number"
        name="productPrice"
        placeholder="Product Price (₦)"
        value={formData.productPrice}
        onChange={handleChange}
        style={styles.input}
        min="0"
        step="0.01"
        required
      />

      <input
        type="text"
        name="productCategory"
        placeholder="Product Category"
        value={formData.productCategory}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.button,
          ...(loading ? styles.buttonDisabled : {}),
        }}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}

export default AddProduct;