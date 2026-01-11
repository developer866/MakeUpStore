import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import DeleteProduct from './DeleteProduct';

function Admin() {
    const styles = {
        container: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            padding: "20px"
        },
        card: {
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }
    };

    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get('http://localhost:5000/products');
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                } else if (res.data.products && Array.isArray(res.data.products)) {
                    setProducts(res.data.products);
                } else {
                    console.error("Unexpected data format:", res.data);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [])

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;
    const handleDeleteFromUI = (id) => {
        setProducts(products.filter(product => product._id !== id));
    }

    return (
        <main>
            <section>

                <div style={styles.container}>
                    {products.length === 0 ? (
                        <p>No products available</p>
                    ) : (
                        products.map((product) => (
                            <div key={product._id} style={styles.card}>
                                <h3>{product.productName}</h3>
                                <p>{product.productDescription}</p>
                                <p><strong>₦{product.productPrice}</strong></p>
                                <span>{product.productCategory}</span>
                                <DeleteProduct id={product._id}
                                    onDelete={handleDeleteFromUI} />
                            </div>
                        ))
                    )}
                </div>
            </section>
            {/* add product  */}
            <section>
                <form action="" method="post">

                </form>
            </section>
        </main>
    )
}

export default Admin