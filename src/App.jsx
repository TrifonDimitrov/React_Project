import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import * as authApi from "./api/auth-api"

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Products from "./components/product-list/Products";
import Company from "./components/company/Company";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import ProductDetails from "./components/details/ProductDetails";
import { AuthContext } from "./contexts/authContext";
import CreateProduct from "./components/create-product/CreateProduct";

function App() {
  const [authState, setAuthState] = useState({
    userId: localStorage.getItem('userId') || '',
    email: localStorage.getItem('email') || '',
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
  });

  const changeAuthState = (state) => {
    localStorage.setItem('userId', state.userId);
    localStorage.setItem('email', state.email);
    localStorage.setItem('token', state.token);
    setAuthState(state);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setAuthState({
  //     userId: localStorage.getItem('userId'),
  //     email: localStorage.getItem('email'),
  //     token: token,
  //     isAuthenticated: !!token,
  //   });
  // }, []);

  const logout = async () => {
    try {
      await authApi.logout() // Ако има такава функция
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      setAuthState({
        userId: null,
        email: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
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
          <Route path="/products/create" element={<CreateProduct />} />
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
