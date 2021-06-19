import React, { useEffect, useState } from "react";
import CartContextProvider from "../../contexts/CartContextProvider";
import api from "../../utils/api";
import AddToCart from "../AddToCart/AddToCart";
import CartSummary from "../CartSummary/CartSummary";
import "./App.scss";

const getProductsFromApi = async () => {
  return await fetch(api.CART).then((resp) => resp.json());
};

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsFromApi().then((data) => {
      for (const product of data) {
        setProducts((prevArray) => [...prevArray, product]);
      }
    });
  }, []);

  return (
    <div className="container">
      <CartContextProvider>
        <h3 className="cart-title">Lista produktów</h3>
        <ul>
          {products.length
            ? products.map((product) => {
                return (
                  <li key={product.pid} className="row">
                    {product.name}, cena: {parseFloat(product.price).toFixed(2)}
                    zł
                    <AddToCart product={product} />
                  </li>
                );
              })
            : "Loading..."}
        </ul>
        <CartSummary />
      </CartContextProvider>
    </div>
  );
};

export default App;
