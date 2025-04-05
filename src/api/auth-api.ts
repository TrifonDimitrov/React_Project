import * as request from "./requester";
import { AuthResponse } from "../types/authTypes";
import { UserProfile } from "../types/userType";

const BASE_URL = "http://localhost:3000/api";

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const result = await request.post<AuthResponse>(`${BASE_URL}/login`, {
      email,
      password,
    });
    localStorage.setItem("token", result.token);

    return result;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (
  userName: string,
  email: string,
  password: string,
  rePassword: string
): Promise<AuthResponse> => {
  try {
    const result = await request.post<AuthResponse>(`${BASE_URL}/register`, {
      userName,
      email,
      password,
      rePassword,
    });
    localStorage.setItem("token", result.token);

    console.log("register result:", result);

    return result;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return {};
};

export const getProfileInfo = async (): Promise<UserProfile> => {
  try {
    const result = await request.get<UserProfile>(`${BASE_URL}/users/profile`);

    return result;
  } catch (error) {
    console.error("Failed fetching user data:", error);
    throw error;
  }
};

export const updateUserInfo = async (
  formData: UserProfile
): Promise<UserProfile> => {
  try {
    const response = await request.put<UserProfile>(
      `${BASE_URL}/users/profile/`,
      formData
    );

    return response;
  } catch (error) {
    console.error("Failed updating user data:", error);
    throw error;
  }
};

export const deleteUser = async (): Promise<Response> => {
  try {
    const response = await request.del<Response>(`${BASE_URL}/users/profile/`);

    return response;
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};
