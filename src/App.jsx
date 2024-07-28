import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import Company from "./components/Company";
import Register from "./components/Register";
import Login from "./components/Login";


function App() {

  return (
    <div className="bg-white">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/company" element={<Company/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </div>

  );
}

export default App;
