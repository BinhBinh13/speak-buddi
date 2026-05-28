// src/shared/services/authService.js
import apiClient from "./apiClient";

export const loginWithEmail = (email, password) =>
  apiClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const loginWithGoogle = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
  //                        ↑ đổi từ process.env sang import.meta.env
};

export const register = (email, password) =>
  apiClient("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getToken = () => localStorage.getItem("token");
export const isAuthenticated = () => !!localStorage.getItem("token");