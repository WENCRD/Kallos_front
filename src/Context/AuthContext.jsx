import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // 👈 à installer si pas encore fait

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded); // 👈 on restaure les infos utilisateur
        setIsAuthenticated(true);
        console.log("🔁 Session restaurée :", decoded);
      } catch (error) {
        console.error("❌ Erreur lors du décodage du token :", error);
        localStorage.removeItem("token"); // Si le token est corrompu
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    const decoded = jwtDecode(userData.token);
    setIsAuthenticated(true);
    setUser(decoded);
    console.log("✅ Utilisateur connecté :", decoded);
  };

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
