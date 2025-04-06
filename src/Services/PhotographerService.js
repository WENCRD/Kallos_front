import axios from "axios";

// ✅ Récupérer tous les photographes
function getAllPhotographers() {
    return axios.get(`http://localhost:3000/photographers/all`);
}

// ✅ Mettre à jour les informations d'un photographe
function updatePhotographer(id_photographer, photographerData) {
    return axios.post(`http://localhost:3000/photographers/update/${id_photographer}`, photographerData);
}

// ✅ Ajouter un photographe
function addPhotographer(id_User, photographerData) {
    return axios.post(`http://localhost:3000/photographers/add`, { id_user: id_User, ...photographerData });
}

// ✅ Récupérer un photographe par son `user_id`
function getPhotographer(id_user) {
    return axios.get(`http://localhost:3000/photographes/getPhotographeId/${id_user}`);
}

// ✅ Supprimer un photographe
function deletePhotographer(id_User) {
    return axios.delete(`http://localhost:3000/photographers/delete/${id_User}`);
}

export default {
    getAllPhotographers,
    updatePhotographer,
    addPhotographer,
    getPhotographer,
    deletePhotographer
};
