import React, { useContext, useState, useEffect } from "react";
import AuthContext, { AuthProvider } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PhotographeService from "../Services/PhotographeService";
import MannequinService from "../Services/MannequinService";
import "bootstrap/dist/css/bootstrap.min.css";

  const ProfilePage = () => {
    const { isAuthenticated, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [profileData, setProfileData] = useState({});
    const [selectedDays, setSelectedDays] = useState([]);
    const [profilePhotos, setProfilePhotos] = useState([]);

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
    }, [navigate]); // ✅ Ajout de navigate dans le tableau des dépendances

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

    const toggleDay = (day) => {
      setSelectedDays((prevDays) =>
        prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
      );
    };

    const handleUploadPhoto = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePhotos((prevPhotos) => [...prevPhotos, reader.result]); 
        };
        reader.readAsDataURL(file);
      }
    };

    const handleDeletePhoto = (index) => {
      setProfilePhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index)); 
    };

    if (!userData) return <p>Chargement...</p>;

  return (
    <div className="my-container">
      <header className="text-center py-4 header">
        <h1 className="head-title">KALLOS VISION</h1>
        <h2 className="mt-2">{userData.username || "Nom d'utilisateur"}</h2>
        <p className="text-muted">{userData.type || "Type d'utilisateur"}</p>
      </header>

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
      </div>

      {/* Sections */}
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
          <p>Localisation : {profileData.location || "Non spécifié"}</p>
        </div>

        <div className="section-box">
          <h3>Corps</h3>
          {userData.type === "mannequin" ? (
            <>
              <p>Taille : {profileData.height || "Non spécifiée"}</p>
              <p>Yeux : {profileData.eye_color || "Non spécifiée"}</p>
              <p>Cheveux : {profileData.hair_color || "Non spécifiée"}</p>
              <p>Poitrine : {profileData.bust_size || "Non spécifiée"}</p>
              <p>Tour de hanches : {profileData.hips_size || "Non spécifiée"}</p>
              <p>Tour de taille : {profileData.waist_size || "Non spécifiée"}</p>
              <p>Pointure : {profileData.shoe_size || "Non spécifiée"}</p>
            </>
          ) : (
            <>
              <p>Appareil photo : {profileData.camera || "Non spécifié"}</p>
              <p>Style : {profileData.style || "Non spécifié"}</p>
            </>
          )}
        </div>
      </div>

      {/* Section Photos */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Photos</h3>

          {/* 🔹 Conteneur flex pour les images (max 5 par ligne) */}
          <div className="">
            {profilePhotos.map((photo, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 p-2relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
                <img src={photo} alt={`photo-${index}`} className="w-full h-full object-cover" />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => handleDeletePhoto(index)}
                >
                  ✕
                </button>
              </div>
            ))}

            {/* 📌 Bouton "Ajouter une photo" (s'affiche si < 5 photos) */}
            {profilePhotos.length < 5 && (
              <div className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-md">
                <input type="file" accept="image/*" className="hidden" id="upload-photo" onChange={handleUploadPhoto} />
                <label htmlFor="upload-photo" className="cursor-pointer text-gray-500 text-sm">
                  + Ajouter
                </label>
              </div>
            )}
          </div>

          {/* 🔹 Bouton Modifier aligné à droite */}
          <div className="flex justify-end mt-2">
            <button className="text-sm text-blue-500 font-semibold">Modifier</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
