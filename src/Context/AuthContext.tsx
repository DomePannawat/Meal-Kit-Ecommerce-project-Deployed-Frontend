import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

  const handleSetToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken); // เก็บ Token ใน localStorage
    } else {
      localStorage.removeItem("authToken"); // ลบ Token ถ้า logout
    }
    setToken(newToken); // อัพเดตค่า Token ใน state
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};
