import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import api from "../../utils/api";
import "./AddToCart.scss";

const AddToCart = ({ pid, min, max, isBlocked }) => {
  const [quantity, setQuantity] = useState(min);

  const debounced = useRef(
    debounce((qty) => {
      const data = {
        pid,
        quantity: qty,
      };
      fetch(api.PRODUCT_CHECK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (!data.success) {
            console.error(data.message);
            setQuantity(min);
          }
        })
        .catch((err) => console.error(err));
    }, 500)
  );

  const changeQty = (e) => {
    if (isBlocked) return;

    const oldQty = parseInt(e.target.value);
    const newQty = quantity + oldQty;
    if (newQty >= min && newQty <= max) setQuantity(newQty);
  };

  useEffect(() => {
    debounced.current(quantity);
  }, [quantity]);

  return (
    <section className="add-to-cart">
      <button onClick={changeQty} value="1" disabled={isBlocked}>
        +
      </button>
      <button onClick={changeQty} value="-1" disabled={isBlocked}>
        -
      </button>
      <span>Obecnie masz {quantity} sztuk produktu</span>
    </section>
  );
};

export default AddToCart;
