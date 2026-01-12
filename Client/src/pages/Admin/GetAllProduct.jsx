import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

function GetAllProduct({ products, onDelete, onUpdateSingle, onSetProducts }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      const fetchedProducts = res.data.products || res.data || [];
      
      // Set all products in parent component
      if (onSetProducts) {
        onSetProducts(fetchedProducts);
      }
    } catch (err) {
      setError(err.message);
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    if (onUpdateSingle) {
      onUpdateSingle(updatedProduct);
    }
    setEditingProduct(null);
  };

  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
    },
    cardUnavailable: {
      opacity: 0.6,
      backgroundColor: "#f8f9fa",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "12px",
    },
    title: {
      margin: 0,
      fontSize: "18px",
      fontWeight: "600",
      flex: 1,
    },
    availabilityBadge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: "bold",
      marginLeft: "8px",
    },
    available: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    unavailable: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    description: {
      color: "#666",
      fontSize: "14px",
      marginBottom: "12px",
      lineHeight: "1.4",
    },
    price: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#28a745",
      marginBottom: "8px",
    },
    category: {
      display: "inline-block",
      padding: "4px 12px",
      backgroundColor: "#e9ecef",
      borderRadius: "12px",
      fontSize: "12px",
      color: "#495057",
      marginBottom: "12px",
    },
    actionButtons: {
      display: "flex",
      gap: "8px",
      marginTop: "12px",
    },
    editButton: {
      flex: 1,
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    sectionHeader: {
      padding: "0 20px",
      marginTop: "20px",
      marginBottom: "10px",
    },
    loadingContainer: {
      textAlign: "center",
      padding: "60px 20px",
      fontSize: "16px",
      color: "#666",
    },
    errorContainer: {
      textAlign: "center",
      padding: "60px 20px",
      fontSize: "16px",
      color: "#d9534f",
      backgroundColor: "#f8d7da",
      border: "1px solid #f5c6cb",
      borderRadius: "8px",
      margin: "20px",
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      fontSize: "16px",
      color: "#666",
      gridColumn: "1 / -1",
    },
  };

  if (loading) {
    return <div style={styles.loadingContainer}>Loading products...</div>;
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <strong>Error loading products:</strong> {error}
      </div>
    );
  }

  return (
    <section>
      <div style={styles.sectionHeader}>
        <h2 style={{ margin: 0 }}>All Products ({products.length})</h2>
      </div>

      <div style={styles.container}>
        {products.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No products available. Add your first product below!</p>
          </div>
        ) : (
          products.map(product => (
            <div
              key={product._id}
              style={{
                ...styles.card,
                ...(product.productAvailability === false ? styles.cardUnavailable : {}),
              }}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.title}>{product.productName}</h3>
                <span
                  style={{
                    ...styles.availabilityBadge,
                    ...(product.productAvailability !== false
                      ? styles.available
                      : styles.unavailable),
                  }}
                >
                  {product.productAvailability !== false ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <p style={styles.description}>{product.productDescription}</p>

              <div style={styles.price}>
                ₦{Number(product.productPrice).toLocaleString()}
              </div>

              <span style={styles.category}>{product.productCategory}</span>

              <div style={styles.actionButtons}>
                <button
                  onClick={() => setEditingProduct(product)}
                  style={styles.editButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                >
                  Edit
                </button>

                <DeleteProduct
                  id={product._id}
                  onDelete={onDelete}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onUpdate={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </section>
  );
}

export default GetAllProduct;