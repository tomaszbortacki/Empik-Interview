import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useCart } from "../../contexts/CartContextProvider";
import api from "../../utils/api";
import "./AddToCart.scss";

const AddToCart = ({ product }) => {
  const { pid, price, min, max, isBlocked } = product;
  const [quantity, setQuantity] = useState(min);
  const { initCart, changeProductQuantity } = useCart();

  const checkProductQtyWithAPI = useRef(
    debounce(async (qty) => {
      const body = JSON.stringify({
        pid,
        quantity: qty,
      });

      await fetch(api.PRODUCT_CHECK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.isError) {
            if (data.errorType === "INCORRECT_QUANTITY") setQuantity(min);
            console.error(data.message);
          }
        })
        .catch((err) => console.log(err));
    }, 500)
  );

  const changeQty = (e) => {
    if (isBlocked) return;

    setQuantity((oldQuantity) => {
      const newQuantityValue = parseInt(event.target.value);
      const newQty = oldQuantity + newQuantityValue;

      if (newQty >= min - 100 && newQty <= max) {
        return newQty;
      }

      return oldQuantity;
    });
  };

  useEffect(() => {
    initCart(pid, price, min);
  }, []);

  useEffect(() => {
    checkProductQtyWithAPI.current(quantity);
    changeProductQuantity(pid, quantity);
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
