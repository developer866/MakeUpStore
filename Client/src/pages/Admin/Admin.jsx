import React, { useState } from "react";
import AddProduct from "./AddProduct";
import GetAllProduct from "./GetAllProduct";

function Admin() {
  const [products, setProducts] = useState([]);

  // Add new product to the list
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  // Remove product from the list
  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  // Update single product in the list
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p =>
        p._id === updatedProduct._id ? updatedProduct : p
      )
    );
  };

  // Set all products (used when fetching from backend)
  const handleSetProducts = (fetchedProducts) => {
    setProducts(fetchedProducts);
  };

  const styles = {
    main: {
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      paddingBottom: "40px",
    },
    header: {
      backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    title: {
      margin: 0,
      textAlign: "center",
      color: "#333",
      fontSize: "28px",
    },
  };

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
      </header>

      {/* Add Product Section */}
      <section>
        <AddProduct onAdd={handleAddProduct} />
      </section>

      {/* Get All Products Section */}
      <GetAllProduct
        products={products}
        onDelete={handleDeleteProduct}
        onUpdateSingle={handleUpdateProduct}
        onSetProducts={handleSetProducts}
      />
    </main>
  );
}

export default Admin;