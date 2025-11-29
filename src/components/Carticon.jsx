import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function DynamicCart() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Cart Icon */}
      <FaShoppingCart 
        size={20} 
        style={{ cursor: "pointer" }}
        onClick={() => setCount(count + 1)} // Add item when clicked
      />

      {/* Badge */}
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "8px",
            padding: "2px 4px",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}
