import React, { useState, useEffect, useRef } from "react";
import MannequinCard from "../Components/MannequinCard";
import mannequinService from "../Services/MannequinService";
import "../MannequinPcss.css"; // Importation des styles CSS

const MannequinPage = () => {
  const [mannequins, setMannequins] = useState([]);
  const [filteredMannequins, setFilteredMannequins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sectionRefs = {
    all: useRef(null),
    ethnicity: useRef(null),
    sex: useRef(null),
    type: useRef(null),
  };

  useEffect(() => {
    console.log("Chargement des mannequins...");
    mannequinService
      .getAllMannequins()
      .then((response) => {
        console.log("Mannequins reçus :", response.data);
        setMannequins(response.data);
        setFilteredMannequins(response.data); // Afficher tous les mannequins par défaut
      })
      .catch((err) => {
        setError("Impossible de charger les mannequins");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterMannequins = (criteria) => {
    if (criteria === "all") {
      setFilteredMannequins(mannequins);
    } else {
      const filtered = mannequins.filter((mannequin) => mannequin[criteria]);
      setFilteredMannequins(filtered);
    }
    sectionRefs[criteria].current.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>❌ Erreur: {error}</p>;

  return (
    <div>
      {/* En-tête avec boutons originaux */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center bg-cover bg-center img">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="head-title text-4xl md:text-6xl font-bold">KALLOS VISION</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Une plateforme innovante pour mannequins et photographes.
          </p>
          <div className=" button-container  mt-6 flex flex-wrap justify-center gap-4">
            <button
              className="btnhp px-6 py-2 text-gray-700 hover:text-black transition"
              onClick={() => navigate('/mannequins')}
            >
              MANNEQUINS
            </button>
            <button className="btnhp px-6 py-2 text-gray-700 hover:text-black transition">
              PHOTOGRAPHES
            </button>
          </div>
        </div>
      </header>

      {/* Bande blanche avec boutons */}
<div className="boutons-filtrage w-full flex justify-center text-center mt-6">
  <div className="flex justify-center items-center gap-8 w-full">
    <button
      onClick={() => filterMannequins('all')}
      className="btnhp px-6 py-2 text-gray-700 hover:text-black transition">
      TOUS
    </button>
    <button
      onClick={() => filterMannequins('ethnicity')}
      className="btnhp px-6 py-2 text-gray-700 hover:text-black transition">
      ETHNIE
    </button>
    <button
      onClick={() => filterMannequins('sex')}
      className="btnhp px-6 py-2 text-gray-700 hover:text-black transition">
      SEXE
    </button>
    <button
      onClick={() => filterMannequins('type')}
      className="btnhp px-6 py-2 text-gray-700 hover:text-black transition">
      TYPE
    </button>
  </div>
</div>

      {/* Liste filtrée des mannequins */}
     
      <div className="mannequin-list">
        {filteredMannequins.length > 0 ? (
          filteredMannequins.map((mannequin) => (
            <div className="mannequin-card" key={mannequin.id_mannequin}>
              <MannequinCard mannequin={mannequin} />
            </div>
            
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            Aucun mannequin trouvé.
          </p>
        )}
      
      </div>
    </div>
  );
};

export default MannequinPage;
