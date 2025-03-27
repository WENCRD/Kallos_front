import { useContext, useState } from 'react';
import UsersService from '../Services/UsersService';
import AuthContext from "../Context/AuthContext"; 
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';


const LoginModal = ({ onClose, onSignUp }) => {


  const navigate = useNavigate();
  // const [email, setemail] = useState('');
  // const [password_hash, setpassword_hash] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { setIsAuthenticated, login } = useContext(AuthContext);
  const [connect, setConnect] = useState({ email: '', password_hash: '' });


  const handleSubmit = async (e) => {
    console.log(e);
     
    e.preventDefault();
    setErrorMessage(null);
    // console.log('test');
    console.log('Connexion avec:',connect);

    setErrorMessage(null);
    try {
      const response = await UsersService.getUsers(connect);
      console.log('Réponse API:', response);

      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Connexion réussie', response);

        
        //login({username: response.data.username, email: connect.email });
        setIsAuthenticated(true)
        

        onClose();
        navigate('/')
        location.reload();
      } else {
        console.error('Erreur : Le token est manquant dans la réponse de l’API.');
        setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
      }

    } catch (error) {
      console.log("Erreur lors de la connexion :", error);
      setErrorMessage("Identifiants incorrects. Veuillez réessayer.");

    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal-contener">
        {/* Bouton de fermeture */}
        <button className="btn-close" onClick={() => onClose("Le module est fermé")}>
          &times;
        </button>

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
              <label name="email">E-mail</label>
              <input required={true}
                onChange={(e) =>
                  setConnect({ ...connect, email: e.target.value })} type="email" id="email" placeholder="Votre e-mail"
                value={connect.email} />
            </div>

            <div className="form-group">
              <label name="password">Mot de passe</label>
              <input required={true}
                onChange={(e) =>
                  setConnect({ ...connect, password_hash: e.target.value })}
                type="password" id="password" placeholder="Votre mot de passe"
                value={connect.password_hash} />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* Case à cocher et lien */}
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
              <button type="submit" className="btn-login"  >
                Connexion
              </button>
            </div>
          </Form>

          {/* Lien pour s'inscrire */}
          <div className="sign-up-link">
            <p>
              Vous êtes nouveau ?{" "}
              <a href="#" onClick={onSignUp}>
                Inscrivez-vous
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
