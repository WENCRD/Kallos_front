import React, { useState, useEffect, useRef } from "react";
import PhotographerCard from "../Components/PhotographeCard"; // Vérifie bien que le fichier existe
import photographerService from "../Services/PhotographerService";
import "../allMetP.css"; // Importation des styles CSS

const PhotographerPage = () => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRefs = {
    all: useRef(null),
    specialty: useRef(null),
    location: useRef(null),
    experience_years: useRef(null),
  };

  useEffect(() => {
    console.log("🔄 Chargement des photographes...");
    photographerService.getAllPhotographes()
      .then((data) => {
        console.log("✅ Photographes reçus :", data);
        setPhotographers(data);
        setFilteredPhotographers(data);
      })
      .catch((err) => {
        setError("❌ Impossible de charger les photographes");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterPhotographers = (criteria) => {
    if (criteria === "all") {
      setFilteredPhotographers(photographers);
    } else {
      const filtered = photographers.filter((photographe) => photographe[criteria]);
      setFilteredPhotographers(filtered);
    }
    sectionRefs[criteria].current.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <p>⏳ Chargement en cours...</p>;
  if (error) return <p>❌ Erreur: {error}</p>;

  return (
    <div>
      {/* En-tête */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center bg-cover bg-center img">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="head-title text-4xl md:text-6xl font-bold">KALLOS VISION</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Une plateforme innovante pour mannequins et photographes.
          </p>
          <div className="button-container mt-6 flex flex-wrap justify-center gap-4">
            <button className="btnhp">MANNEQUINS</button>
            <button className="btnhp">PHOTOGRAPHES</button>
          </div>
        </div>
      </header>

      {/* Boutons de filtrage */}
      <div className="boutons-filtrage">
        <div className="flex justify-center gap-8">
          <button onClick={() => filterPhotographers("all")} className="btnhp">TOUS</button>
          <button onClick={() => filterPhotographers("specialty")} className="btnhp">SPÉCIALITÉ</button>
          <button onClick={() => filterPhotographers("experience_years")} className="btnhp">EXPÉRIENCE</button>
          <button onClick={() => filterPhotographers("location")} className="btnhp">LOCALISATION</button>
        </div>
      </div>

      {/* Liste des photographes */}
      <div  className="mannequin-list">
        {filteredPhotographers.length > 0 ? (
          filteredPhotographers.map((photographe) => (
            <div className="mannequin-card" key={photographe.id_photographer}>
              <PhotographerCard photographer={photographe} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">Aucun photographe trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default PhotographerPage;
