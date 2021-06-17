import React, { useState } from "react";
import "./AddToCart.scss";

const AddToCart = ({ min, max, isBlocked }) => {
  const [count, setCount] = useState(0);

  const checkIfCanBeChange = (val) => {
    if (isBlocked) return;
    const newValue = count + val;
    newValue >= min - 1 && newValue <= max ? setCount(newValue) : "";
  };

  return (
    <section className="add-to-cart">
      <button onClick={() => checkIfCanBeChange(1)} disabled={isBlocked}>
        +
      </button>
      <button onClick={() => checkIfCanBeChange(-1)} disabled={isBlocked}>
        -
      </button>
      <span>Obecnie masz {count} sztuk produktu</span>
    </section>
  );
};

export default AddToCart;
