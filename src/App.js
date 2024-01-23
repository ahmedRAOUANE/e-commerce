import { Route, Routes } from "react-router-dom";

// components
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import Pages from "./pages/Pages";
import Contact from "./pages/Contact";
import ProductDetailes from "./pages/ProductDetailes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";

function App() {
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
