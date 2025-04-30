import Nav from "./components/Nav";
import "./App.css";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router";
import Products from "./pages/Products";
import ProductDisplay from "./pages/ProductDisplay";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "./features/cart/cartSlice";

function App() {
  const BASE_URL = import.meta.env.BASE_URL;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Nav />
      <Routes>
        <Route path={BASE_URL + ""} element={<Home />} />
        <Route
          path={BASE_URL + "category/:category/:page"}
          element={<Products />}
        />
        <Route path={BASE_URL + "category/:category"} element={<Products />} />
        <Route
          path={BASE_URL + "product/:productID"}
          element={<ProductDisplay />}
        />
        <Route path={BASE_URL + "register"} element={<Register />} />
        <Route path={BASE_URL + "login"} element={<Login />} />
        <Route path={BASE_URL + "order"} element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
