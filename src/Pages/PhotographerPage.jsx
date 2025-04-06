import React, { useState, useEffect, useRef } from "react";
import MannequinCard from "../Components/MannequinCard";
import photographerService from "../Services/PhotographerService";
import "../MannequinPcss.css"; // Importation des styles CSS

const PhotographerPage = () => {
  const [photographers, setPhotographer] = useState([]);
  const [filtereredPhotographer, setFilteredPhotographer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRefs = {
    all: useRef(null),
    ethnicity: useRef(null),
    sex: useRef(null),
    type: useRef(null),
  };

  useEffect(() => {
    console.log("Chargement des Photographe...");
    photographerService
      .getAllPhotographer()
      .then((response) => {
        console.log("Photographe reçus :", response.data);
        setPhotographer(response.data);
        setFilteredPhotographer(response.data); // Afficher tous les mannequins par défaut
      })
      .catch((err) => {
        setError("Impossible de charger les Photographes");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filterPhotographer = (criteria) => {
    if (criteria === "all") {
      setFilteredPhotographer(photographers);
    } else {
      const filtered = photographers.filter((photographe) => photographe[criteria]);
      setFilteredPhotographer(filtered);
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
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              className="btnhp px-6 py-2 bg-white text-black rounded-lg"
              onClick={() => console.log("Naviguer vers mannequins")}
            >
              MANNEQUINS
            </button>
            <button className="btnhp px-6 py-2 bg-white text-black rounded-lg">
              PHOTOGRAPHES
            </button>
          </div>
        </div>
      </header>

      {/* Bande blanche avec boutons */}
      <div className="boutons-filtrage">
        <div className="flex justify-center gap-8">
          <button
            onClick={() => filterPhotographer("all")}
            className="btnhp px-6 py-2 bg-white text-black rounded-lg"
          >
            TOUS
          </button>
          <button
            onClick={() => filterPhotographer("ethnicity")}
            className="btnhp px-6 py-2 bg-white text-black rounded-lg"
          >
            ETHNIE
          </button>
          <button
            onClick={() => filterPhotographer("sex")}
            className="btnhp px-6 py-2 bg-white text-black rounded-lg"
          >
            SEXE
          </button>
          <button
            onClick={() => filterPhotographer("type")}
            className="btnhp px-6 py-2 bg-white text-black rounded-lg"
          >
            TYPE
          </button>
        </div>
      </div>

      {/* Liste filtrée des mannequins */}
      <div className="mannequin-list">
        {filtereredPhotographer.length > 0 ? (
          filtereredPhotographer.map((photographe) => (
            <div className="mannequin-card" key={photographe.id_photographe}>
              <PhotographerCard photographe={photographe} />
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

export default PhotographerPage;
