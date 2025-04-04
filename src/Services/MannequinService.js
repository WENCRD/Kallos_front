import axios from "axios";



    // Modifier les infos d'un mannequin
    function  getAllMannequins() {
        return axios.get(`http://localhost:3000/mannequins/all`);
    }

    // Modifier les infos d'un mannequin
    function updatePhotographe(id_mannequin) {
        return axios.post(`http://localhost:3000/users/updatePhotographe/${id_mannequin}`);
    }


    // Ajouter un mannequin
    function addMannequin(id_User, mannequinData) {
        return axios.post(`http://localhost:3000/mannequins/addMannequin/`,{id_user: id_User, ...mannequinData});
    }


    //  Mise à jour des informations d'un mannequin

    function getMannequin(user_id) {
        return axios.get(`http://localhost:3000/mannequins/getMannequinId/${user_id}`);
    }

    //  Supprimer un mannequin
    function deleteMannequin(id_User) {
        return axios.delete(`http://localhost:3000/mannequins/deleteMannequin/${id_User}`);
    }

export default {
     updatePhotographe,
     getMannequin,
     addMannequin,
     deleteMannequin,
     getAllMannequins
};
