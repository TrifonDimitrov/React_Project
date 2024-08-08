import { login } from "../api/auth-api";

import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

export const useLogin = () => {
  const { changeAuthState } = useContext(AuthContext);

  const loginHandler = async (email, password) => {
    const {password:_, ...result} = await login(email, password);

    changeAuthState(result);

    return result;
  };

  return loginHandler;
};

export const useRegister = () => {
  const { changeAuthState } = useContext(AuthContext);

  const registerHandler = async ( userName, email, password, rePassword) => {
    const {password:_, ...result} = await register( userName, email, password, rePassword);

    changeAuthState(result);

    return result;
  };

  return registerHandler;
};
