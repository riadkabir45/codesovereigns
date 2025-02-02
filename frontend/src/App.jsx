import Nav from "./components/Nav";
import './App.css';
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router";
import Products from "./pages/Products";

function App() {

  const BASE_URL = import.meta.env.BASE_URL;

  return (
    <>
      <Nav/>
        <Routes>
          <Route path={BASE_URL+""} element={<Home/>} />
          <Route path={BASE_URL+"category/:category"} element={<Products/>} />
        </Routes>
      <Footer/>
    </>
  );
}

export default App;