import React, { useContext, useEffect, useState } from "react";

const CartContext = React.createContext(null);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  const initCart = (pid, price, qty) => {
    setCart((state) => [...state, { pid, price, qty }]);
  };

  const changeCart = (pid, qty) => {
    setCart((oldCart) => {
      const newCart = oldCart.map((product) => {
        if (product.pid === pid) product.qty = qty;
        return product;
      });
      return newCart;
    });
  };

  useEffect(() => {
    let sum = 0;
    cart.map(({ price, qty }) => {
      sum += price * qty;
    });
    setCount(sum);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        count,
        initCart,
        changeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContextProvider;
