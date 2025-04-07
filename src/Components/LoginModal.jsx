  import { useContext, useState } from 'react';
  import UsersService from "../Services/UsersService.js";
  import AuthContext from "../Context/AuthContext"; 
  import { useNavigate } from 'react-router-dom';
  import { Form } from 'react-bootstrap';

  const LoginModal = ({ onClose, onSignUp }) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [connect, setConnect] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false); // État pour la gestion du chargement

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage(null);
  
      if (!connect.email || !connect.password) {
          setErrorMessage("Veuillez remplir tous les champs.");
          return;
      }
  
      setLoading(true);
      try {
          const response = await UsersService.postLogin(connect);
          console.log("🔹 Réponse du serveur :", response);
  
          if (response?.data?.token) {
              localStorage.setItem('token', response.data.token);
              console.log("✅ Token stocké après connexion :", localStorage.getItem("token"));
  
              // ✅ Utilisation de login() pour gérer l'authentification
              login({ token: response.data.token });
  
              // ✅ Redirection immédiate après la connexion réussie
              navigate('/ProfilePage');
          } else {
              setErrorMessage("Connexion échouée. Vérifiez vos identifiants.");
          }
      } catch (error) {
          console.error("❌ Erreur lors de la connexion :", error);
          if (error.response) {
              setErrorMessage(error.response.data?.message || "Identifiants incorrects.");
          } else {
              setErrorMessage("Problème de connexion au serveur.");
          }
      } finally {
          setLoading(false);
      }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Bouton de fermeture */}
        <button className="btn-close" onClick={onClose}>&times;</button>

        <div className="login-container">
          {/* Logo centré */}
          <div className="logo">
            <img src="src/img/Kallos_Vision Logo.png" alt="Logo" className="logo-img" />
            <h1 className="welcom">Bienvenue sur Kallos Vision</h1>
          </div>

          {/* Section "Se connecter avec Facebook ou Email" */}
          <div className="social-login">
            <h2>Se connecter avec</h2>
            <button className="btn-facebook">
              <img src="src/img/Kallos_facebook.png" alt="Facebook" className="social-icon" />
              Facebook
            </button>
            <p>ou</p>
          </div>

          {/* Formulaire de connexion par e-mail */}
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Votre e-mail"
                value={connect.email}
                onChange={(e) => setConnect({ ...connect, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                placeholder="Votre mot de passe"
                value={connect.password}
                onChange={(e) => setConnect({ ...connect, password: e.target.value })}
                required
              />
            </div>

            {/* Affichage du message d'erreur s'il y en a */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Case à cocher et lien pour mot de passe oublié */}
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" id="remember-me" />
                Se souvenir de moi
              </label>
              <a href="#" className="forgot-password">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <div className="form-actions">
              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? "Connexion..." : "Connexion"}
              </button>
            </div>
          </Form>

          {/* Lien pour s'inscrire */}
          <div className="sign-up-link">
            <p>
              Vous êtes nouveau ? <a href="#" onClick={onSignUp}>Inscrivez-vous</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
