import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import * as authApi from "./api/auth-api";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Products from "./components/product-list/Products";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ProductDetails from "./components/details/ProductDetails";
import EditProduct from "./components/details/EditProduct";
import { AuthContext } from "./contexts/authContext";
import CreateProduct from "./components/create-product/CreateProduct";
import ProfilePage from "./components/profile-page/ProfilePage";

function App() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  const [authState, setAuthState] = useState({
    userId: "",
    email: "",
    token: storedToken || "",
    isAuthenticated: !!storedToken,
  });

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem("token", authState.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [authState.token]);

  const changeAuthState = (state) => {
    setAuthState(
      state || { userId: "", email: "", token: "", isAuthenticated: false }
    );
  };

  const logout = async () => {
    changeAuthState(null);
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    navigate("/login");
  };

  const contextData = {
    ...authState,
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
          <Route
            path="/profile"
            element={
              authState.isAuthenticated ? (
                <ProfilePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
