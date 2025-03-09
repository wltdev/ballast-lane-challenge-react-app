import { User } from "../components/UserInfo";

export const getUserToken = () => {
  return localStorage.getItem("token");
};

export const setUserToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const setUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
