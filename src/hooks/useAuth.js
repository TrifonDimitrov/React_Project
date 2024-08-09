import { login, register } from "../api/auth-api";

import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

export const useLogin = () => {
  const { changeAuthState } = useContext(AuthContext);

  const loginHandler = async (email, password) => {
    try {
      const result = await login(email, password);
      handleLoginSuccess(result);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLoginSuccess = (result) => {
    localStorage.setItem("token", result.token);
    localStorage.setItem("userId", result.userId); // Ако също записвате userId
    localStorage.setItem("email", result.email); // Ако също записвате email

    // Обновете състоянието на контекста
    changeAuthState({
      userId: result.userId,
      email: result.email,
      token: result.token,
      isAuthenticated: true,
    });
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useContext(AuthContext);

  const registerHandler = async (userName, email, password, rePassword) => {
    try {
      const result = await register(userName, email, password, rePassword);
      handleRegisterSuccess(result);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleRegisterSuccess = (result) => {
    localStorage.setItem("token", result.token);
    localStorage.setItem("userId", result.userId); // Ако също записвате userId
    localStorage.setItem("email", result.email); // Ако също записвате email

    // Обновете състоянието на контекста
    changeAuthState({
      userId: result.userId,
      email: result.email,
      token: result.token,
      isAuthenticated: true,
    });
  };

  return registerHandler;
};

