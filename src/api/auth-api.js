import * as request from "./requester";

const BASE_URL = "http://localhost:3000/api";

export const login = async (email, password) => {
  const result = await request.post(`${BASE_URL}/login`, { email, password });

  return result;
};

export const register = async (email, userName, password, rePassword) => {
  const result = await request.post(`${BASE_URL}/register`, {
    email,
    userName,
    password,
    rePassword
  });

  return result;
};
