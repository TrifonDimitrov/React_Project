import * as request from "./requester";

const BASE_URL = "http://localhost:3000/api";

export const login = async (email, password) => {
  try {
    const result = await request.post(`${BASE_URL}/login`, { email, password });
    localStorage.setItem("token", result.token);
    console.log('login result:', result);
    return result;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (userName, email, password, rePassword) => {
  try {
    const result = await request.post(`${BASE_URL}/register`, {
      userName,
      email,
      password,
      rePassword,
    });
    localStorage.setItem("token", result.token); // съхраняване на токена
    
    console.log('register result:', result);
    
    return result;
    
    
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return {};
};
