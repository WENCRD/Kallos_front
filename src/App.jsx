import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import HomePage from './Pages/HomePage';
import MannequinPage from './Pages/MannequinPage';
import PhotographerPage from './Pages/PhotographerPage';
import ProfilePage from './Pages/ProfilePage';
import EditUserPage from './Pages/EditUserPage';
import AdminPage from './Pages/AdminPage'; // ✅ AJOUT DE LA PAGE ADMIN

import Navbar from './Components/NavBar';
import Footer from './Components/Footer';

import AuthService from './Services/AuthService';
import AuthContext, { AuthProvider } from "./Context/AuthContext";

import './App.css';

// 🔐 Route protégée
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isValid = AuthService.isValid();
    setIsAuthenticated(isValid);
    if (isValid) {
      const userInfo = AuthService.getUserInfo();
      setUsername(userInfo?.username || "");
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mannequins" element={<MannequinPage />} />
          <Route path="/photographes" element={<PhotographerPage />} />
          <Route path="/ProfilePage" element={<PrivateRoute element={<ProfilePage />} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} /> {/* ✅ PAGE ADMIN */}
          <Route path="/profile/:id_user" element={<PrivateRoute element={<EditUserPage />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
