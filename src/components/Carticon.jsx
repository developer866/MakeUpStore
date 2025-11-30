import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector} from 'react-redux';


export default function DynamicCart() {
  // const [count, setCount] = useState(0);
  const navigate = useNavigate();
  // const count = 0; // Replace with actual cart item count from Redux store or context
  const { totalItems } = useSelector(state => state.cart);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Cart Icon */}
      <FaShoppingCart
        size={20}
        style={{ cursor: "pointer" }}
        onClick={() => navigate('/Cart')}
      />

      {/* Badge */}
      {totalItems > 0 && (
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
          {totalItems }
        </span>
      )}
    </div>
  );
}
