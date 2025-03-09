import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getUserToken, setUserToken, setUser, logout } from "../utils/storage";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import { User } from "../components/UserInfo";

// Define the shape of our context
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  user: User | null;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logoutUser: () => {},
  user: null,
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserState] = useState<User | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = getUserToken();
      if (token) {
        setIsAuthenticated(true);
        try {
          const userData = JSON.parse(localStorage.getItem("user") || "null");
          if (userData) {
            setUserState(userData);
          }
        } catch (error) {
          console.error("Error parsing user data", error);
        }
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/login", { email, password });
      const { access_token, user } = data.data;

      // Set token and user in storage
      setUserToken(access_token);
      setUser(user);

      // Update state
      setIsAuthenticated(true);
      setUserState(user);

      toast.success("Login successful");
    } catch (error) {
      toast.error("Invalid credentials");
      throw error;
    }
  };

  // Logout function
  const logoutUser = () => {
    logout();
    setIsAuthenticated(false);
    setUserState(null);
    toast.info("Logged out successfully");
  };

  // The context value that will be provided
  const contextValue: AuthContextType = {
    isAuthenticated,
    login,
    logoutUser,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Export only the provider component from this file
// The hook is moved to useAuthContext.ts
