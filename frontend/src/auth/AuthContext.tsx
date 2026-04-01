import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("fintra_user")
  );

  const login = (email: string) => {
    localStorage.setItem("fintra_user", email);
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem("fintra_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Auth context missing");
  return ctx;
};

