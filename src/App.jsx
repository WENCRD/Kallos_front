import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './Pages/HomePage';
import MannequinPage from './Pages/MannequinPage';
import ProfilePage from './Pages/ProfilePage';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import AuthService from './Services/AuthService';
import AuthContext from './Context/AuthContext';
import './App.css';

// ✅ Composant pour protéger les routes privées
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = AuthService.isValid();
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  // ✅ Vérification de l'authentification au chargement de l'application
  useEffect(() => {
    const isValid = AuthService.isValid();
    setIsAuthenticated(isValid);
    if (isValid) {
      const userInfo = AuthService.getUserInfo();
      setUsername(userInfo?.username || "");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mannequins" element={<MannequinPage />} />
          {/* ✅ Page Profil protégée (accessible uniquement si connecté) */}
          <Route path="/ProfilePage" element={<PrivateRoute element={<ProfilePage />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
