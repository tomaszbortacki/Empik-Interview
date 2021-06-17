import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./App.css";

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
        {products.map((product) => {
          return (
            <li key={product.pid} className="row">
              {product.name}, cena: {parseFloat(product.price).toFixed(2)}zł
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
