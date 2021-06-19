import React, { useContext, useEffect, useState } from "react";

const CartContext = React.createContext(null);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  const initCart = (pid, price, qty) => {
    setCart((state) => [...state, { pid, price, qty }]);
  };

  const changeProductQuantity = (pid, qty) => {
    setCart((oldCart) => {
      const newCart = oldCart.map((product) => {
        if (product.pid === pid) product.qty = qty;
        return product;
      });
      return newCart;
    });
  };

  useEffect(() => {
    const sum = cart.reduce((acc, { price, qty }) => {
      return acc + price * qty;
    }, 0);

    setCount(sum);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        count,
        initCart,
        changeProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContextProvider;
