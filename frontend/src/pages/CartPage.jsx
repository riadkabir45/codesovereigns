import { useSelector } from "react-redux";

const CartPage = () => {
  const { cart, ...order } = useSelector((state) => state?.cart?.value);
  console.log(cart, order);
  return <div>CartPage</div>;
};

export default CartPage;
