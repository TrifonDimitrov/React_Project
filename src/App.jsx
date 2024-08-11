import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as authApi from "./api/auth-api";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Products from "./components/product-list/Products";
import Company from "./components/company/Company";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ProductDetails from "./components/details/ProductDetails";
import EditProduct from "./components/details/EditProduct";
import { AuthContext } from "./contexts/authContext";
import CreateProduct from "./components/create-product/CreateProduct";

function App() {
  const [authState, setAuthState] = useState({
    userId: localStorage.getItem("userId") || "",
    email: localStorage.getItem("email") || "",
    token: localStorage.getItem("token") || "",
    isAuthenticated: !!localStorage.getItem("token"),
  });

  const changeAuthState = (state) => {
    localStorage.setItem("userId", state.userId);
    localStorage.setItem("email", state.email);
    localStorage.setItem("token", state.token);
    setAuthState(state);
  };

  const logout = async () => {
    try {
      await authApi.logout(); // Ако има такава функция
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      setAuthState({
        userId: null,
        email: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const contextData = {
    userId: authState.userId,
    email: authState.email,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    changeAuthState,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      <div className="bg-white">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:modelId" element={<ProductDetails />} />
          <Route
            path="/products/create"
            element={
              authState.isAuthenticated ? (
                <CreateProduct />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/products/edit/:modelId"
            element={
              authState.isAuthenticated ? (
                <EditProduct />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/company" element={<Company />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
