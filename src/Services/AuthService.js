import axios from "axios";
import { jwtDecode } from "jwt-decode";

// URL de l'API (à modifier selon ton backend)
const API_URL = "http://localhost:3000";

// ✅ Récupère le token depuis sessionStorage (plus sécurisé)
function getToken() {
    return localStorage.getItem("token");
}

// ✅ Ajoute le token aux requêtes Axios
function setAxiosToken() {
    const token = getToken();
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

// ✅ Enregistre le token après connexion
function login(token) {
    localStorage.setItem("token", token);
    setAxiosToken();
}

// ✅ Supprime le token après déconnexion
function logout() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
}

// ✅ Vérifie si l'utilisateur est connecté et si son token est valide
function isValid() {
    const token = getToken();
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            logout(); // Token expiré, on déconnecte l'utilisateur
            return false;
        } else {
            setAxiosToken(); // Token valide, on l'ajoute aux requêtes
            return true;
        }
    }
    return false;
}

// ✅ Récupère les infos de l'utilisateur (username, email)
function getUserInfo() {
    const token = getToken();
    if (token && isValid()) {
        const decodedToken = jwtDecode(token);
        return {
            username: decodedToken.username,
            email: decodedToken.email,
        };
    }
    return null;
}

// ✅ Rafraîchit le token (si ton backend gère le "refresh token")
async function refreshToken() {
    try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
        if (response.data.token) {
            login(response.data.token);
        }
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du token :", error);
        logout();
    }
}

export default { login, logout, isValid, getUserInfo, refreshToken, setAxiosToken };
