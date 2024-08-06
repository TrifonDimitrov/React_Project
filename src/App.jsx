import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Products from "./components/product-list/Products";
import Company from "./components/company/Company";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ProductDetails from "./components/details/ProductDetails";
import { AuthContext } from "./contexts/authContext";

function App() {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  const contextData = {
    email: authState.email,
    token: authState.token,
    isAuthenticated: !!authState.email,
    changeAuthState,
  };

  return (
    <AuthContext.Provider value={contextData}>
      <div className="bg-white">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:modelId" element={<ProductDetails />} />
          <Route path="/company" element={<Company />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
