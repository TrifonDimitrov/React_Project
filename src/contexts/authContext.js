import { createContext } from "react";

export const AuthContext = createContext({
    userId: '',
    email: '',
    token: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
});