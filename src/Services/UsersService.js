import axios from "axios";
import { getCsrfToken } from "./csrf"; // Ce fichier exporte une fonction getCsrfToken()

// 🔹 Récupérer un utilisateur par ID
function getUserById(id_user) {
  return axios.get(`http://localhost:3000/users/user/${id_user}`, {
    withCredentials: true,
  });
}

// 🔹 Modifier un utilisateur
async function updateUser(id_user, updatedData) {
  const csrfToken = await getCsrfToken();
  return axios.put(`http://localhost:3000/users/updateUser/${id_user}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    withCredentials: true,
  });
}

// 🔹 Upload de photo de profil
function uploadProfilePicture(id_user, formData) {
  return axios.post(`http://localhost:3000/users/uploadProfilePicture/${id_user}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
}

// 🔹 Connexion d'un utilisateur
async function postLogin(data) {
  const csrfToken = await getCsrfToken();
  return axios
    .post(
      "http://localhost:3000/users/LoginPage",
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      }
    )
    .catch((err) => {
      console.error("❌ Erreur login:", err.response?.data || err);
    });
}

// 🔹 Inscription d’un utilisateur
async function postSign(data) {
  try {
    const csrfToken = await getCsrfToken();
    const response = await axios.post(
      "http://localhost:3000/users/SigninPage",
      {
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
        city: data.city,
        bio: data.bio || null,
        profile_picture: data.profile_picture || null,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        withCredentials: true,
      }
    );

    console.log("✅ Réponse du serveur :", response.data);
    return response.data;
  } catch (err) {
    if (err.response?.data?.errors) {
      err.response.data.errors.forEach((e) => console.error(`- ${e.msg}`));
    } else {
      console.error("❌ Erreur inscription :", err.response?.data || err);
    }
  }
}

// 🔹 Récupérer tous les utilisateurs (pour admin)
function getAllUsers() {
  return axios.get("http://localhost:3000/users/allUsers", {
    withCredentials: true,
  });
}

// 🔹 Supprimer un utilisateur (admin ou utilisateur connecté)
async function deleteUser(id_user) {
  const token = localStorage.getItem("token");
  const csrfToken = await getCsrfToken();

  return axios.delete(`http://localhost:3000/users/deleteUser/${id_user}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CSRF-Token": csrfToken,
    },
    withCredentials: true,
  });
}

// 🔹 Export des fonctions
export default {
  postSign,
  postLogin,
  getCsrfToken,
  uploadProfilePicture,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
};
