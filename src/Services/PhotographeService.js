import axios from "axios";



    // Modifier les infos d'un Photographe
    function updatePhotographe(id_User, photographerData) {
        return axios.post(`http://localhost:3000/photographes/updatePhotographe/${id_User}`);
    }


    // Ajouter un Photographe
    function addPhotographe(id_User) {
        return axios.post(`http://localhost:3000/photographes/addPhotographe/${id_User}`);
    }


    //  Mise à jour des informations d'un photographe
    function getPhotographe(id) {
        return axios.get(`http://localhost:3000/photographes/getPhotographe/${id}`);
    }

    //  Supprimer un Photographe
    function deletePhotographe(id_User) {
        return axios.delete(`http://localhost:3000/photographes/deletePhotographe/${id_User}`);
    }

export default {
     updatePhotographe,
     getPhotographe,
     addPhotographe,
     deletePhotographe
};
