import { createContext } from "react";

export const AuthContext = createContext({
    email: '',
    token: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
});