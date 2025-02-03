import axios from "axios";

// Récupérer toutes les réservations
function getAllBooking() {
    return axios.get(`http://localhost:3000/users/Booking/allBooking`);
}

//  Ajouter une réservation
function addBooking(booking) {
    return axios.post(`http://localhost:3000/users/Booking/addBooking`, booking);
}

//  Connexion d'un utilisateur
function getUsers(users) {
    return axios.post(`http://localhost:3000/users/LoginPage`, users);
}

//  Inscription d'un utilisateur
function getSign(sign) {
    return axios.post(`http://localhost:3000/users/users/SigninPage`, sign);
}

//  Connexion (nouvelle API)
function getlogin(user) {
    return axios.post("http://localhost:3000/users/connexion", user);
}

//  Supprimer une réservation
function getDeleteBooking(idBooking) {
    return axios.get(`http://localhost:3000/users/Booking/deleteBooking/${idBooking}`);
}





//  Export des fonctions
export default {
    getAllBooking,
    addBooking,
    getUsers,
    getSign,
    getlogin,
    getDeleteBooking
};
