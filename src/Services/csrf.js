// src/api/csrf.js
export const getCsrfToken = async () => {
    try {
        const response = await fetch('http://localhost:3000/csrf-token', {
            credentials: 'include' // Nécessaire pour recevoir les cookies CSRF
        });
        const data = await response.json();
        return data.csrfToken;
    } catch (error) {
        console.error("Erreur lors de la récupération du token CSRF :", error);
        return null;
    }
};
