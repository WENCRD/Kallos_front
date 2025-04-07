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
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [editMode, setEditMode] = useState(false); // État pour passer en mode édition

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
        response = await PhotographerService.getPhotographer(id_user);
      }

      setProfileData(response.data);
      setSelectedDays(response.data.availability || []);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données :", error);
    }
  };

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !userData?.id_user) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const csrfRes = await fetch("http://localhost:3000/csrf-token", {
        credentials: "include",
      });
      const { csrfToken } = await csrfRes.json();

      const response = await fetch(`http://localhost:3000/users/uploadProfilePicture/${userData.id_user}`, {
        method: "POST",
        credentials: "include",
        headers: { "X-CSRF-Token": csrfToken },
        body: formData,
      });

      if (!response.ok) throw new Error(`Upload failed (${response.status})`);
      await fetchUserProfile(userData.id_user, userData.type);
    } catch (error) {
      console.error("❌ Erreur upload :", error);
      alert("Erreur upload image.");
    }
  };

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotos((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (index) => {
    setProfilePhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        await UsersService.deleteUser(userData.id_user);
        alert("Compte supprimé.");
        logout();
        navigate("/");
      } catch (error) {
        console.error("Erreur suppression :", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  if (!userData) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="relative w-full flex flex-col items-center justify-center text-center bg-cover bg-center img">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-6 w-full">
          <h1 className="head-title text-4xl font-bold">KALLOS VISION</h1>

          <div className="profile-picture-container w-full flex justify-center items-center mt-8">
            <div className="profile-picture rounded-full overflow-hidden border-4 border-white shadow-lg w-32 h-32 flex items-center justify-center">
              <img
                src={userData?.profile_picture || "default-image.jpg"}
                alt="Profil"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="profile-text">
            <h2 className="text-xl">{userData?.username || "Nom d'utilisateur"}</h2>
            <p className="text-gray-600">{userData?.type || "Type d'utilisateur"}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl p-6">
        <div className="profile-sections space-y-8">
          {/* Section À propos */}
          <div className="section-box bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">À propos</h3>
            {editMode ? (
              <>
                <input
                  name="location"
                  value={profileData.location || ""}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="form-control my-2"
                  placeholder="Ville"
                />
                <input
                  name="language"
                  value={profileData.language || ""}
                  onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                  className="form-control my-2"
                  placeholder="Langue"
                />
                {userData?.type === "mannequin" && (
                  <input
                    name="agency"
                    value={profileData.agency || ""}
                    onChange={(e) => setProfileData({ ...profileData, agency: e.target.value })}
                    className="form-control my-2"
                    placeholder="Agence"
                  />
                )}
              </>
            ) : (
              <>
                <p>Ville : {profileData.location || "Non spécifié"}</p>
                <p>Langue : {profileData.language || "Non spécifié"}</p>
                {userData?.type === "mannequin" && <p>Agence : {profileData.agency || "Non spécifié"}</p>}
              </>
            )}
          </div>

          {/* Section Professionnelles */}
          <div className="section-box bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Professionnelles</h3>
            {editMode ? (
              <>
                <input
                  name="experience"
                  value={profileData.experience || ""}
                  onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                  className="form-control my-2"
                  placeholder="Expérience"
                />
                <input
                  name="portfolio"
                  value={profileData.portfolio || ""}
                  onChange={(e) => setProfileData({ ...profileData, portfolio: e.target.value })}
                  className="form-control my-2"
                  placeholder="Lien portfolio"
                />
              </>
            ) : (
              <>
                <p>Expérience : {profileData.experience || "Non spécifié"}</p>
                <p>Portfolio : {profileData.portfolio || "Non spécifié"}</p>
              </>
            )}
          </div>

          {/* Section Caractéristiques */}
          <div className="section-box bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Caractéristiques</h3>
            {userData?.type === "mannequin" ? (
              editMode ? (
                <>
                  <input
                    name="height"
                    value={profileData.height || ""}
                    onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                    className="form-control my-2"
                    placeholder="Taille"
                  />
                  <input
                    name="eye_color"
                    value={profileData.eye_color || ""}
                    onChange={(e) => setProfileData({ ...profileData, eye_color: e.target.value })}
                    className="form-control my-2"
                    placeholder="Yeux"
                  />
                  <input
                    name="hair_color"
                    value={profileData.hair_color || ""}
                    onChange={(e) => setProfileData({ ...profileData, hair_color: e.target.value })}
                    className="form-control my-2"
                    placeholder="Cheveux"
                  />
                </>
              ) : (
                <>
                  <p>Taille : {profileData.height || "Non spécifiée"}</p>
                  <p>Yeux : {profileData.eye_color || "Non spécifiée"}</p>
                  <p>Cheveux : {profileData.hair_color || "Non spécifiée"}</p>
                </>
              )
            ) : (
              editMode ? (
                <>
                  <input
                    name="camera"
                    value={profileData.camera || ""}
                    onChange={(e) => setProfileData({ ...profileData, camera: e.target.value })}
                    className="form-control my-2"
                    placeholder="Appareil photo"
                  />
                  <input
                    name="style"
                    value={profileData.style || ""}
                    onChange={(e) => setProfileData({ ...profileData, style: e.target.value })}
                    className="form-control my-2"
                    placeholder="Style"
                  />
                </>
              ) : (
                <>
                  <p>Appareil photo : {profileData.camera || "Non spécifié"}</p>
                  <p>Style : {profileData.style || "Non spécifié"}</p>
                </>
              )
            )}
          </div>
        </div>

        {/* Bouton Modifier */}
        <div className="text-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => setEditMode((prev) => !prev)} // Bascule entre le mode édition et le mode affichage
          >
            {editMode ? "Enregistrer" : "Modifier"}
          </button>
        </div>

        {/* Section Disponibilité */}
        <div className="section-box  availability bg-white p-6 rounded-2xl shadow-lg my-8">
          <h3 className="text-lg font-bold">Disponibilité</h3>
          <div className="availability-days">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
              <button
                key={day}
                className={selectedDays.includes(day) ? "active" : ""}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Section Photos */}
        <div className="section-box mx-auto px-4 py-8 bg-white p-6 rounded-lg shadow-lg my-8">
          <h3 className="text-lg font-bold mb-4">Photos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {profilePhotos.map((photo, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden"
              >
                <img
                  src={photo}
                  alt={`photo-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700 transition"
                  onClick={() => handleDeletePhoto(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {profilePhotos.length < 5 && (
            <div className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-md cursor-pointer hover:border-gray-600 transition">
              <input type="file" accept="image/*" className="hidden" id="upload-photo" onChange={handleUploadPhoto} />
              <label htmlFor="upload-photo" className="text-gray-500 text-sm">
                + Ajouter
              </label>
            </div>
          )}
        </div>

        {/* 🔴 Bouton Supprimer le compte */}
        <div className="flex justify-center mt-8">
          <button
            className="btnr px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={handleDeleteAccount}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
