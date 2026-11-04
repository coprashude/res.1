import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEY_AUTH } from '../config/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      return saved ? JSON.parse(saved) : {
        id: "usr-1",
        name: "Alex Morgan",
        email: "alex.morgan@techlead.dev",
        plan: "Pro"
      };
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    const mockUser = {
      id: "usr-" + Date.now(),
      name: email.split("@")[0].toUpperCase(),
      email,
      plan: "Pro"
    };
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

