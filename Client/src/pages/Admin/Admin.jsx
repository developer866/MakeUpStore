import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function Admin() {
  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      position: "relative",
    },
    cardUnavailable: {
      opacity: 0.6,
      backgroundColor: "#f8f9fa",
    },
    category: {
      display: "inline-block",
      padding: "4px 8px",
      backgroundColor: "#e9ecef",
      borderRadius: "4px",
      fontSize: "12px",
      marginTop: "8px",
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
    actionButtons: {
      display: "flex",
      gap: "8px",
      marginTop: "12px",
    },
    editButton: {
      flex: 1,
      padding: "8px 12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    }
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data.products || res.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFromUI = (id) => {
    setProducts(prev =>
      prev.filter(product => product._id !== id)
    );
  };

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#d9534f" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <main>
      {/* ADD PRODUCT SECTION */}
      <section>
        <AddProduct onAdd={handleAddProduct} />
      </section>

      {/* PRODUCTS SECTION */}
      <section>
        <h2 style={{ padding: "0 20px", marginTop: "40px" }}>
          All Products ({products.length})
        </h2>
        <div style={styles.container}>
          {products.length === 0 ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
              No products available. Add your first product above!
            </p>
          ) : (
            products.map(product => (
              <div
                key={product._id}
                style={{
                  ...styles.card,
                  ...(product.productAvailability === false ? styles.cardUnavailable : {}),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <h3 style={{ margin: 0, flex: 1 }}>{product.productName}</h3>
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
                <p style={{ color: "#666", fontSize: "14px" }}>
                  {product.productDescription}
                </p>
                <p style={{ fontSize: "18px", fontWeight: "bold", color: "#28a745" }}>
                  ₦{Number(product.productPrice).toLocaleString()}
                </p>
                <span style={styles.category}>
                  {product.productCategory}
                </span>

                <div style={styles.actionButtons}>
                  <button
                    onClick={() => setEditingProduct(product)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <DeleteProduct
                    id={product._id}
                    onDelete={handleDeleteFromUI}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onUpdate={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </main>
  );
}

export default Admin;