import * as request from "./requester";

const BASE_URL = "http://localhost:3000/api";

export const login = (email, password) =>
  request.post(`${BASE_URL}/login`, { email, password });

export const register = async (userName, email, password, rePassword) => {
  console.log("Register from authApi:", userName, email, password, rePassword);


  console.log("Before request.post in register");
  const result = await request.post(`${BASE_URL}/register`, {
    userName,
    email,
    password,
    rePassword,
  });

  console.log("After request.post in register");

  return result;
};
