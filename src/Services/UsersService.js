import axios from "axios";

// Récupérer toutes les réservations
function getAllBooking() {
    return axios.get(`http://localhost:3000/users/Booking/allBooking`);
}

//  Ajouter une réservation
function addBooking(booking) {
    return axios.post(`http://localhost:3000/users/Booking/addBooking`, booking);
}

// ✅ Vérifie que getCsrfToken est défini UNE SEULE FOIS
async function getCsrfToken() {
    const response = await axios.get("http://localhost:3000/csrf-token", { withCredentials: true });
    return response.data.csrfToken;
}

// 🔹 Connexion d'un utilisateur
async function postLogin(data) {
    const csrfToken = await getCsrfToken();
    console.log("🚀 Token CSRF utilisé:", csrfToken);
    console.log("📩 Données envoyées:", data);

    return axios.post("http://localhost:3000/users/LoginPage", {
        email: data.email,
        password: data.password // 🔹 Changer password_hash en password
    }, {
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        withCredentials: true
    }).catch(err => {
        console.error("❌ Erreur login:", err.response?.data || err);
    });
}


// 🔹 Inscription d'un utilisateur
async function postSign(data) {
    const csrfToken = await getCsrfToken();
    console.log("🚀 Token CSRF utilisé:", csrfToken);
    console.log("📩 Données envoyées pour inscription :", data);

    return axios.post("http://localhost:3000/users/SigninPage", {
        email: data.email,
        password: data.password, // 🔹 Vérifier que le backend attend bien `password`
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        sex: data.sex,
        adress: data.adress,
        postal_code: data.postal_code,
        date_of_birth: data.date_of_birth,
        type: data.type,
        city: data.city
    }, {
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        withCredentials: true
    }).then(response => {
        console.log("✅ Réponse du serveur :", response.data);
        return response.data;
    }).catch(err => {
        console.error("❌ Erreur inscription :", err.response?.data || err);
    });
}


//  Supprimer une réservation
function getDeleteBooking(idBooking) {
    return axios.get(`http://localhost:3000/users/Booking/deleteBooking/${idBooking}`);
}





//  Export des fonctions
export default {
    getAllBooking,
    addBooking,
    postSign,
    postLogin,
    getDeleteBooking,
    getCsrfToken
};
