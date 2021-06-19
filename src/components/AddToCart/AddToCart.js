import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useCart } from "../../contexts/CartContextProvider";
import api from "../../utils/api";
import "./AddToCart.scss";

const AddToCart = ({ product }) => {
  const { pid, price, min, max, isBlocked } = product;
  const [quantity, setQuantity] = useState(min);
  const { initCart, changeCart } = useCart();

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
    initCart(pid, price, min);
  }, []);

  useEffect(() => {
    debounced.current(quantity);
    changeCart(pid, quantity);
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
