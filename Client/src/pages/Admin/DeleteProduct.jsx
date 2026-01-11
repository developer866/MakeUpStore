import React from "react";

function DeleteProduct({ id, onDelete }) {
  const API_URL = "http://localhost:5000/products/";

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product");
      }

      alert("Product deleted successfully");

      // update UI only after success
      onDelete(id);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      style={{ background: "red", color: "white", marginTop: "10px" }}
    >
      Delete
    </button>
  );
}

export default DeleteProduct;
