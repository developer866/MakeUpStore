import React, { useState } from "react";
import axios from "axios";

function EditProduct({ product, onUpdate, onCancel }) {
  const API_URL = "http://localhost:5000/products";

  const [formData, setFormData] = useState({
    productName: product.productName,
    productDescription: product.productDescription,
    productPrice: product.productPrice,
    productCategory: product.productCategory,
    productAvailability: product.productAvailability ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.put(`${API_URL}/${product._id}`, {
        ...formData,
        productPrice: Number(formData.productPrice),
      });

      alert("Product updated successfully");

      // Update UI in Admin
      if (onUpdate && res.data) {
        onUpdate(res.data);
      }
    } catch (error) {
      console.error("Update product error:", error);
      const errorMessage = error.response?.data?.error || error.message || "Failed to update product";
      setError(errorMessage);
      alert(`Failed to update product: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
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
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "#666",
      padding: "0",
      width: "30px",
      height: "30px",
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
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "4px",
    },
    checkbox: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
      cursor: "pointer",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
    button: {
      flex: 1,
      padding: "12px",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    saveButton: {
      backgroundColor: "#28a745",
      color: "#fff",
    },
    cancelButton: {
      backgroundColor: "#6c757d",
      color: "#fff",
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
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Edit Product</h2>
          <button
            onClick={onCancel}
            style={styles.closeButton}
            type="button"
            title="Close"
          >
            ×
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
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

          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="productAvailability"
              name="productAvailability"
              checked={formData.productAvailability}
              onChange={handleChange}
              style={styles.checkbox}
            />
            <label htmlFor="productAvailability" style={styles.label}>
              Product is available in stock
            </label>
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={onCancel}
              style={{ ...styles.button, ...styles.cancelButton }}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...styles.saveButton,
                ...(loading ? styles.buttonDisabled : {}),
              }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;