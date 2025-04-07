import React, { useEffect, useState } from "react";
import UsersService from "../Services/UsersService.js";
import { useNavigate } from "react-router-dom";
import "/AdminPage.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Charger tous les utilisateurs à l'initialisation
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UsersService.getAllUsers(); // 🔹 Tu dois avoir cette fonction dans UsersService
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await UsersService.deleteUser(id); // 🔹 deleteUser à ajouter dans ton service
        fetchUsers(); // Mise à jour de la liste
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const handleEdit = (id_user) => {
    navigate(`/editUser/${id_user}`); // 🔹 Assure-toi d'avoir une route EditUserPage
  };

  return (
    <div className="admin-container">
      <h1 className="text-center my-4">👮 Tableau de bord Admin</h1>
      <div className="user-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id_user}>
            <img
              src={`http://localhost:3000/${user.profile_picture || "uploads/profile_pictures/default.jpg"}`}
              alt="profil"
              className="user-avatar"
            />
            <h4>{user.username}</h4>
            <p>{user.type}</p>
            <div className="card-actions">
              <button className="btn-edit" onClick={() => handleEdit(user.id_user)}>Modifier</button>
              <button className="btn-delete" onClick={() => handleDelete(user.id_user)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
