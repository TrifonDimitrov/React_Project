import { createContext } from "react";

export const AuthContext = createContext({
    userId: null,
    email: null,
    token: null,
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    logout: () => {},
});