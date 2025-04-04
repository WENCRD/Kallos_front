import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Vérifie si l'utilisateur est déjà connecté
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // ✅ Fonction login
  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    setIsAuthenticated(true);
    setUser(userData);
    console.log("✅ Utilisateur connecté :", userData);
  };

  // ✅ Fonction logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    console.log("🔹 Déconnexion réussie !");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
