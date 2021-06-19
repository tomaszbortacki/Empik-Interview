import React from "react";
import { useCart } from "../../contexts/CartContextProvider";
import "./CartSummary.scss";

const Cart = () => {
  const { count } = useCart();

  return (
    <p className="cart-summary">
      Suma: <strong>{parseFloat(count).toFixed(2)}zł</strong>
    </p>
  );
};

export default Cart;
