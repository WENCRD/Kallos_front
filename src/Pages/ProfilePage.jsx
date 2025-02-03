import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PhotographeService from "../Services/PhotographeService";
import MannequinService from "../Services/MannequinService";
import "bootstrap/dist/css/bootstrap.min.css";


const ProfilePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [activeSection, setActiveSection] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
        fetchUserProfile(decoded.id_user, decoded.type);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  const fetchUserProfile = async (id_user, type) => {
    try {
      let response;
      if (type === "mannequin") {
        response = await MannequinService.getMannequin(id_user);
      } else if (type === "photographe") {
        response = await PhotographeService.getPhotographe(id_user);
      }
      setProfileData(response.data);
      setSelectedDays(response.data.availability || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleUpdate = async () => {
    try {
      const userId = userData.id_user || userData.id;
      const updatedProfile = { ...profileData, availability: selectedDays };

      if (userData.type === "mannequin") {
        await MannequinService.updateMannequin(userId, updatedProfile);
      } else if (userData.type === "photographe") {
        await PhotographeService.updatePhotographe(userId, updatedProfile);
      }

      setProfileData(updatedProfile);
      toggleModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  if (!userData) return <p>Chargement...</p>;

  return (
    <div className="container">
      <header className="text-center py-4 header">
        <h1 className="head-title">KALLOS VISION</h1>
        <div className="text-center">
          <img src="src/img/kallos_oeil.png" alt="User Avatar" className="rounded-circle avatar" />
          <h2 className="mt-2">{userData.username || "Nom d'utilisateur"}</h2>
          <p className="text-muted">{userData.type || "Type d'utilisateur"}</p>
          <button onClick={toggleModal} className="btn">Modifier mon profil</button>
        </div>
      </header>

      {/* Boutons Profil et Messages */}
      <div className="nav-buttons">
        <button onClick={() => setActiveSection("profile")} className={`btn ${activeSection === "profile" ? "btn-primary" : "btn-outline-primary"}`}>
          Profil
        </button>
        <button onClick={() => setActiveSection("messages")} className={`btn ${activeSection === "messages" ? "btn-primary" : "btn-outline-primary"}`}>
          Messages
        </button>
      </div>

      {/* Contenu dynamique */}
      <div className="dynamic-content">
        {activeSection === "profile" && (
          <>
            <div className="profile-sections">
              <div className="section-box">
                <h3>À propos</h3>
                <p>Ville : {profileData.location || "Non spécifié"}</p>
                <p>Langue : {profileData.language || "Non spécifié"}</p>

                {userData.type === "mannequin" && <p>Agence : {profileData.agency || "Non spécifié"}</p>}
              </div>

              <div className="section-box">
                <h3>Professionnelles</h3>
                <p>Expérience : {profileData.experience || "Non spécifié"}</p>
                <p>Portfolio : {profileData.portfolio || "Non spécifié"}</p>
                <p>localisation : {profileData.location || "Non spécifié"}</p>
              </div>
              <div className="section-box">

                <h3>Corps</h3>
                {userData.type === "mannequin" ? (
                  <>
                    <p>Taille : {profileData.height || "Non spécifiée"}</p>
                    <p>Yeux : {profileData.eye_color || "Non spécifiée"}</p>
                    <p>Cheveux : {profileData. hair_color || "Non spécifiée"}</p>
                    <p>Poitrine : {profileData.bust_size || "Non spécifiée"}</p>
                    <p>Tour de hanches : {profileData.hips_size || "Non spécifiée"}</p>
                    <p>Tour de taille : {profileData.waist_size || "Non spécifiée"}</p>
                    <p>Pointure : {profileData. shoe_size || "Non spécifiée"}</p>
                  </>
                ) : (
                  <>
                    <p>Appareil photo : {profileData.camera || "Non spécifié"}</p>
                    <p>Style : {profileData.style || "Non spécifié"}</p>
                  </>
                )}
              </div>
            </div>

            {/* Galerie de photos */}
            <div className="photo-section">
              <h3>Photos</h3>
              <div className="photo-grid">
                {[profileData.photo1, profileData.photo2, profileData.photo3, profileData.photo4, profileData.photo5].map(
                  (photo, index) =>
                    photo && <img key={index} src={photo} alt={`photo${index + 1}`} />
                )}
              </div>
            </div>

            {/* Disponibilité */}
            <div className="availability">
              <h3>Disponibilité</h3>
              <div className="availability-days">
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                  <button key={day} className={selectedDays.includes(day) ? "active" : ""} onClick={() => toggleDay(day)}>
                    {day}
                  </button>
                ))}
              </div>
              <button className="btn btn-outline-primary" onClick={toggleModal}>Modifier</button>
            </div>
          </>
        )}
        {activeSection === "messages" && <h3>Messagerie à venir...</h3>}
      </div>

      {/* Modal de modification */}
      {isModalOpen && (
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Modifier disponibilité</h5>
                <button className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdate}>Enregistrer</button>
                <button className="btn btn-secondary" onClick={toggleModal}>Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
