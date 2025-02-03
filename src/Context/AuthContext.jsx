import React, { createContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  //---------------Fonction pour se co----------------------
  const login = (userData) => {
    setIsAuthenticated(true);
    setUsername(userData);
  };

  //-----------------Fonction pour se déco------------------
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;