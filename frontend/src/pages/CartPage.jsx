import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const CartPage = () => {
  const { cart, ...order } = useSelector((state) => state?.cart?.value);
  /*
  cart:  [{createdAt: "2025-04-30T17:23:44.438Z"
  id: "7c5233e8-93d5-424b-b892-8b2a04cc4117"
  orderId: "0498ad11-a4b1-4677-803e-a1ec05d35cb8"
  price: 4580
  productId: "0a43b3cc-f8ad-4960-bcf6-2c7ef0fdf18e"
  quantity: 2updatedAt: "2025-04-30T17:23:50.414Z"
  userId: "063f0896-85c4-4246-8427-dd08ba8124fb"}]
order: {
    "id": "0498ad11-a4b1-4677-803e-a1ec05d35cb8",
    "userId": "063f0896-85c4-4246-8427-dd08ba8124fb",
    "status": "UNPAID",
    "total": 604580,
    "createdAt": "2025-04-30T17:21:23.200Z",
    "updatedAt": "2025-04-30T17:23:59.301Z",
  },
  */
  return (
    <div className="flex flex-col items-center justify-center p-10 gap-5">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 border p-5 w-full">
            <NavLink to={`/product/${item.productId}`}>
              <span>{item?.product?.name || item.productId}</span>
            </NavLink>
            <span>Quantity: {item.quantity}</span>
            <span>Cost: {item.price}</span>
          </div>
        ))
      ) : (
        <span>Your cart is empty</span>
      )}
      <h1 className="text-3xl font-bold">Your Order</h1>
      <div className="flex flex-col gap-2 border p-5 w-full">
        <span>Order time: {new Date(order.createdAt).toLocaleString()}</span>
        <span>Status: {order.status}</span>
        <span>Total: {order.total}</span>
      </div>
    </div>
  );
};

export default CartPage;
