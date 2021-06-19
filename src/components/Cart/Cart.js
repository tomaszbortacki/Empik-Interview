import React from "react";
import { useCart } from "../../contexts/CartContextProvider";

const Cart = () => {
  const { count } = useCart();

  return (
    <p>
      Suma: <strong>{parseFloat(count).toFixed(2)}zł</strong>
    </p>
  );
};

export default Cart;
