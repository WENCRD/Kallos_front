import axios from "axios";

// ✅ Récupérer tous les photographesfunction getAllPhotographers() {
    function getAllPhotographes() {
        return axios.get(`http://localhost:3000/photographes/all`)
          .then(response => {
            console.log("✅ Données reçues :", response.data);
            return response.data;
          })
          .catch(error => {
            console.error("❌ Erreur :", error);
          });
      }


// ✅ Mettre à jour les informations d'un photographe
function updatePhotographer(id_photographer, photographerData) {
    return axios.post(`http://localhost:3000/photographes/update/${id_photographer}`, photographerData);
}

// ✅ Ajouter un photographe
function addPhotographer(id_User, photographerData) {
    return axios.post(`http://localhost:3000/photographes/add`, { id_user: id_User, ...photographerData });
}

// ✅ Récupérer un photographe par son `user_id`
function getPhotographer(id_user) {
    return axios.get(`http://localhost:3000/photographes/getPhotographeId/${id_user}`);
}

// ✅ Supprimer un photographe
function deletePhotographer(id_User) {
    return axios.delete(`http://localhost:3000/photographes/delete/${id_User}`);
}

export default {
    getAllPhotographes,
    updatePhotographer,
    addPhotographer,
    getPhotographer,
    deletePhotographer
};
