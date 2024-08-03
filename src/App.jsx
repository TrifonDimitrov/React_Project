import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Products from "./components/product-list/Products";
import Company from "./components/company/Company";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ProductDetails from "./components/details/ProductDetails";


function App() {

  return (
    <div className="bg-white">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:modelId" element={<ProductDetails/>}/>
        <Route path="/company" element={<Company/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </div>

  );
}

export default App;
