import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import MannequinPage from './Pages/MannequinPage';  
import Navbar from './Components/NavBar';
import './App.css';
import AuthService from './Services/AuthService';
import AuthContext from './Context/AuthContext';
import { useState } from 'react';
import ProfilePage from './Pages/ProfilePage';
import Footer from './Components/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isValid());
  const [username, setUsername] = useState(AuthService.getUsername());

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/mannequins" element={<MannequinPage />} />  {/* ✅ Ajout de la route pour mannequins */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
