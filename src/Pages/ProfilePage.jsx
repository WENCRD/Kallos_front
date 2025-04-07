import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PhotographerService from "../Services/PhotographerService";
import MannequinService from "../Services/MannequinService";
import UsersService from "../Services/UsersService.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "/profile.css";

const ProfilePage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
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
  }, [navigate]);
  console.log("🔎 Vérification avant la mise à jour du profil :", userData);

  const fetchUserProfile = async (id_user, type) => {
    console.log("🔍 Profil utilisateur récupéré :", userData);
    try {
        let response;
        if (type === "mannequin") {
            response = await MannequinService.getMannequin(id_user);
        } else if (type === "photographe") {
            response = await PhotographerService.getPhotographer(id_user);
        }

        console.log("✅ Profil récupéré depuis l'API :", response.data);
        setProfileData(response.data);
        setSelectedDays(response.data.availability || []);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des données :", error);
    }
};


  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !userData?.id_user) {
        console.error("❌ Aucun fichier sélectionné ou ID utilisateur manquant !");
        return;
    }

    console.log("📥 Fichier sélectionné :", file.name);

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
        // 👉 Récupération du CSRF token
        console.log("🔐 Récupération du token CSRF...");
        const csrfRes = await fetch("http://localhost:3000/csrf-token", {
            credentials: "include",
        });
        const { csrfToken } = await csrfRes.json();
        console.log("✅ Token CSRF reçu :", csrfToken);

        // 👉 Envoi de l'image avec le token CSRF
        console.log(`📤 Envoi de l'image pour l'utilisateur ID: ${userData.id_user}`);
        const response = await fetch(`http://localhost:3000/users/uploadProfilePicture/${userData.id_user}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRF-Token": csrfToken,
            },
            body: formData,
        });

        console.log("📬 Réponse API reçue :", response);

        if (!response.ok) {
            throw new Error(`Upload failed (${response.status})`);
        }

        const data = await response.json();
        console.log("✅ Image uploadée avec succès :", data);
        console.log("🔎 Photo de profil récupérée :", userData.profile_picture);
        // 👉 Mise à jour du profil pour afficher l'image
        console.log("🔄 Mise à jour du profil utilisateur...");
        fetchUserProfile(userData.id_user, userData.type);
    } catch (error) {
        console.error("❌ Erreur lors de l'upload :", error);
        alert("Erreur lors de l'upload de l'image.");
    }
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
    setProfilePhotos((prevPhotos) =>
      prevPhotos.filter((_, i) => i !== index)
    );
  };

  if (!userData) return <p>Chargement...</p>;
  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      try {
        await UsersService.deleteUser(userData.id_user); // Utilise bien l'id du user connecté
        alert("Compte supprimé avec succès.");
        localStorage.removeItem("token"); // Déconnecte l'utilisateur
        navigate("/"); // Redirige vers l'accueil
      } catch (error) {
        console.error("Erreur lors de la suppression du compte :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };
  
  return (
    <div  className="min-h-screen bg-gray-100">
 <header className="relative w-full flex flex-col items-center justify-center text-center bg-cover bg-center img">
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    <div className="relative  z-10 flex flex-col items-center justify-center px-4 py-12 gap-6 w-full">
      
      {/* Titre */}
      <div className="text-center w-full">
        <h1 className="head-title text-4xl font-bold">KALLOS VISION</h1>
      </div>

        {/* Conteneur pour assurer le bon centrage de l'image */}
<div className="profile-picture-container w-full flex justify-center items-center mt-8">
      <div className="profile-picture rounded-full overflow-hidden border-4 border-white shadow-lg w-32 h-32 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center">
        <img src={userData.profile_picture || "default-image.jpg"} alt="Profil" className="w-full h-full object-cover rounded-full" />
      </div>
    </div>

      {/* Texte sous l’image */}
      <div className="profile-text">
  <h2 className="text-xl">{userData.username || "Nom d'utilisateur"}</h2>
  <p className="text-gray-600">{userData.type || "Type d'utilisateur"}</p>
</div>
    </div>
  </header>


      {/* 🔹 PROFIL SECTIONS */}
      <div className="container mx-auto max-w-4xl p-6">
      <div className="profile-sections space-y-8">
        <div className="section-box bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">À propos</h3>
          <p>Ville : {profileData.location || "Non spécifié"}</p>
          <p>Langue : {profileData.language || "Non spécifié"}</p>
          {userData.type === "mannequin" && <p>Agence : {profileData.agency || "Non spécifié"}</p>}
        </div>

        <div className="section-box bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Professionnelles</h3>
          <p>Expérience : {profileData.experience || "Non spécifié"}</p>
          <p>Portfolio : {profileData.portfolio || "Non spécifié"}</p>
          <p>Localisation : {profileData.location || "Non spécifié"}</p>
        </div>

        <div className="section-box bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Caractéristiques</h3>
          {userData.type === "mannequin" ? (
            <>
              <p>Taille : {profileData.height || "Non spécifiée"}</p>
              <p>Yeux : {profileData.eye_color || "Non spécifiée"}</p>
              <p>Cheveux : {profileData.hair_color || "Non spécifiée"}</p>
            </>
          ) : (
            <>
              <p>Appareil photo : {profileData.camera || "Non spécifié"}</p>
              <p>Style : {profileData.style || "Non spécifié"}</p>
            </>
          )}
        </div>
      </div>

      {/* 🔹 DISPONIBILITÉ */}
      <div className="availability bg-white p-6 rounded-2xl shadow-lg my-8">
  <h3 className="text-lg font-bold">Disponibilité</h3>
  <div className="availability-days">
    {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
      <button key={day} className={selectedDays.includes(day) ? "active" : ""} onClick={() => toggleDay(day)}>
        {day}
      </button>
    ))}
  </div>
</div>


{/* 🔹 TOP SECTION (Séparation entre Disponibilité et Photos) */}
<div className="top-section text-center my-12">
  <h2 className="text-xl font-bold bg-gray-200 py-3 px-6 rounded-lg shadow-md inline-block">
    ⭐ TOP SECTION ⭐
  </h2>
</div>

{/* 🔹 PHOTOS */}
<div className="section-box mx-auto px-4 py-8 bg-white p-6 rounded-lg shadow-lg my-16">
    <h3 className="text-lg font-bold mb-4">Photos</h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {profilePhotos.map((photo, index) => (
      <div key={index} className="relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
        <img src={photo} alt={`photo-${index}`} className="w-full h-full object-cover rounded-md" />
        <button className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700 transition" onClick={() => handleDeletePhoto(index)}>
          ✕
        </button>
      </div>
    ))}
  </div>

  {/* 📌 Bouton "Ajouter une photo" */}
  {profilePhotos.length < 5 && (
    <div className=" w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-md cursor-pointer hover:border-gray-600 transition">
      <input type="file" accept="image/*" className="hidden" id="upload-photo" onChange={handleUploadPhoto} />
      <label htmlFor="upload-photo" className="  text-gray-500 text-sm">
        + Ajouter
      </label>
    </div>
  )}
</div>
<button
  className="btnr mt-4"
  onClick={handleDeleteAccount}
>
  Supprimer mon compte
</button>
    </div>
    
    </div>
  );
};
export default ProfilePage;
