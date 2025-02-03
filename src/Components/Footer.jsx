import React from 'react';

function Footer () {
  return (
    <footer className="footer">
        
      <div className="footer-content">
        <div className="footer-section about">
          <h2>À propos</h2>
          <ul>
            <li><a href="#about">À propos</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Nous contacter</a></li>
            <li><a href="#professional">Professionnel</a></li>
            <li><a href="#model">Mannequin/modèle</a></li>
          </ul>
        </div>
        <div className="footer-section info">
          <h2>Informations</h2>
          <ul>
            <li><a href="#privacy-policy">Politique de confidentialité RGPD</a></li>
            <li><a href="#legal-notice">Mentions légales</a></li>
            <li><a href="#terms">Conditions générales de services</a></li>
          </ul>
        </div>
        <div className="footer-section news">
          <h2>Actualités</h2>
          <p>Notre Newsletter</p>
          <p>Inscrivez-vous à notre newsletter pour recevoir nos actualités et nos offres.</p>
          <form>
            <input type="email" placeholder="Votre email" required />
            <button type="submit">S'inscrire</button>
          </form>
        </div>
        <div className="footer-section social">
          <img src="src/img/kallos_oeil.png" alt="Kallos Vision Logo" className="logo" />
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><img src="src/img/Kallos_facebook (2).png" alt="Instagram" /></a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src="src/img/Kallos_facebook.png" alt="Facebook" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Kallos Vision. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
