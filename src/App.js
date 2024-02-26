import { useEffect } from "react";
import axiosClient from "./axiosClient";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "./features/categoriesSlice";

// components
import Login from "./pages/Login";
import Pages from "./pages/Pages";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ProductDetailes from "./pages/ProductDetailes";

// styles
import "./styles/card.css";
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/button.css";

function App() {
  const categoryList = useSelector((state) => state.categorySlice.categories);
  const dispatch = useDispatch();

  // get all categories
  useEffect(() => {
    if (!categoryList.length) {
      axiosClient.get("/products/categories").then((response) => {
        dispatch(setCategories(response.data));
      });
    }
  });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<Products />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:category/:id" element={<ProductDetailes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
