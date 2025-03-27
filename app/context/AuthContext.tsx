import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import BASE_URL from "../service/config";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    setUser(response.data.user);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
  };

  const register = async (name: string, email: string, password: string) => {
    await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
