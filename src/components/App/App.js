import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import AddToCart from "../AddToCart/AddToCart";
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
      <h3>Lista produktów</h3>
      <ul>
        {products.map(({ pid, name, price, min, max, isBlocked }) => {
          return (
            <li key={pid} className="row">
              {name}, cena: {parseFloat(price).toFixed(2)}zł
              <AddToCart pid={pid} min={min} max={max} isBlocked={isBlocked} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
