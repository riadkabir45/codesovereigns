import { useEffect } from "react";

const CartProvider = (children) => {
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      console.log("Cart loaded from local storage:", cart);
    } else {
      console.log("No items in cart.");
    }
  }, []);
  return children;
};

export default CartProvider;
