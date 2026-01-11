import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteProduct from "./DeleteProduct";
import AddProduct from "./AddProduct";

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
    },
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data.products || res.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const handleDeleteFromUI = (id) => {
    setProducts(prev =>
      prev.filter(product => product._id !== id)
    );
  };

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      {/* PRODUCTS */}
      <section>
        <div style={styles.container}>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map(product => (
              <div key={product._id} style={styles.card}>
                <h3>{product.productName}</h3>
                <p>{product.productDescription}</p>
                <p><strong>₦{product.productPrice}</strong></p>
                <span>{product.productCategory}</span>

                <DeleteProduct
                  id={product._id}
                  onDelete={handleDeleteFromUI}
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* ADD PRODUCT */}
      <section>
        <AddProduct onAdd={handleAddProduct} />
      </section>
    </main>
  );
}

export default Admin;
