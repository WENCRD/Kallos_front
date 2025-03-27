import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import { jwtDecode } from "jwt-decode";
import LoginModal from "./LoginModal";
import SignInModal from "./SignInModal";

function NavBar() {
  const { isAuthenticated, setIsAuthenticated, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  // ------------------------------------scrollNavbar ----------------------
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change to `true` when scrolled 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //-------------------------------décodé le username a partir du token----------------------------

  const username = token ? jwtDecode(token).username : null;

  //-------------------------------Fonction pour se déco-------------------------------------------

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUsername(null);
    navigate("/");
  };

  //----------------Fonction pour toruver le username a partir du token en le décodant------------
  function getUsernameFromToken(token) {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.username; // Retourne le nom d'utilisateur
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      return null;
    }
  }
  const decodedUsername = getUsernameFromToken(token);

  //-------------------------------NavBar-------------------------------------------
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={`custom-navbar ${isScrolled ? "scrolled" : ""}`}>
        <Container>
          {/* Logo */}
          <Navbar.Brand>
            <Link to="/">
              <img
                alt="logo"
                src="src/img/Kallos_Vision Logo.png"
                width="60"
                className="logo-navbar"
              />
            </Link>
          </Navbar.Brand>

          {/* Bouton de menu pour mobile */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Liens de navigation */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto nav-right">
              <div>
                <Link to="/a propos" className="nav-link">
                  À propos
                </Link>
                <Link to="/tarifs" className="nav-link">
                  Nos tarifs
                </Link>
                <Link to="/mannequins" className="nav-link">
                  Mannequins
                </Link>
              </div>

              {/* Gestion de l'authentification */}
              {!isAuthenticated ? (
                <>
                  <button className="bt-inscrip" onClick={() => openModal("signup")}>Inscription</button>
                  <button className="bt-inscrip" onClick={() => openModal("login")}>Connexion</button>

                  {modalType === "signup" && (
                    <SignInModal onClose={closeModal}>
                    
                    </SignInModal>
                  )}

                  {modalType === "login" && (
                    <LoginModal onClose={closeModal}>
                      <h1>Connexion</h1>
                    </LoginModal>
                  )}
                </>
              ) : (
                <>
                  {decodedUsername && (
                    <Link to="/ProfilePage" className="nav-link">
                      Profil de {decodedUsername}
                    </Link>
                  )}
                  <Link to="/" className="nav-link" onClick={handleLogout}>
                    Déconnexion
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
