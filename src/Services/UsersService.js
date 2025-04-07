import axios from "axios";


// 🔹 Récupérer un utilisateur par ID
function getUserById(id_user) {
    return axios.get(`http://localhost:3000/users/user/${id_user}`, {
        withCredentials: true
    });
}

// 🔹 Modifier un utilisateur
async function updateUser(id_user, updatedData) {
    const csrfToken = await getCsrfToken();
    return axios.put(`http://localhost:3000/users/updateUser/${id_user}`, updatedData, {
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        withCredentials: true
    });
}

function uploadProfilePicture(id_user, formData) {
    return axios.post(`http://localhost:3000/users/uploadProfilePicture/${id_user}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true // Pour que CSRF et cookies passent
    });
}


// ✅ Vérifie que getCsrfToken est défini UNE SEULE FOIS
async function getCsrfToken() {
    const response = await axios.get("http://localhost:3000/csrf-token", { withCredentials: true });
    return response.data.csrfToken;
}

// 🔹 Connexion d'un utilisateur
async function postLogin(data) {
    const csrfToken = await getCsrfToken();
    return axios.post("http://localhost:3000/users/LoginPage", {
        email: data.email,
        password: data.password // 🔹 Changer password_hash en password
    }, {
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        withCredentials: true
    }) .catch(err => {
        console.error("❌ Erreur login:", err.response?.data || err);
    });
}


// 🔹 Inscription d'un utilisateur
async function postSign(data) {
    try {
        const csrfToken = await getCsrfToken();
        const response = await axios.post("http://localhost:3000/users/SigninPage", {
            email: data.email,
            password: data.password, 
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
        });

        console.log("✅ Réponse du serveur :", response.data);
        return response.data; // Retourner la réponse complète
    } catch (err) {
        // Vérifier si l'erreur vient de la réponse du serveur
        if (err.response && err.response.data && err.response.data.errors) {
            console.error("❌ Erreurs d'inscription :");
            err.response.data.errors.forEach((error) => {
                console.error(`- ${error.msg}`);
            });
        } else {
            console.error("❌ Erreur inscription :", err.response?.data || err);
        }
    }
}


// 🔹 Récupérer tous les utilisateurs (pour la page admin)
function getAllUsers() {
    return axios.get("http://localhost:3000/users/allUsers");
  }
  
  // 🔹 Supprimer un utilisateur (requiert d’être admin + token)
  function deleteUser(id_user) {
    const token = localStorage.getItem("token");
    return axios.delete(`http://localhost:3000/users/deleteUser/${id_user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }
  

//  Export des fonctions
export default {
    postSign,
    postLogin,
    getCsrfToken,
    uploadProfilePicture,
    getAllUsers,
    deleteUser,
    updateUser,
    getUserById
};