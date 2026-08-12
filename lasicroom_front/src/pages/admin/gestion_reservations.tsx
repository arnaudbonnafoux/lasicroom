import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../composants/NavbarAdmin";
//import Footer from '../../composants/Footer';
import Header from "../../composants/HeaderAdmin";
import "../../styles/gestion_reservations.css";

const GestionReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const navigate = useNavigate();
  // Déconnexion : suppression du token et redirection
  const handleDeconnexion = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const headerToken = response.headers.get("X-CSRF-Token");
      if (headerToken) {
        setCsrfToken(headerToken);
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Accès non autorisé. Veuillez vous reconnecter.");
        }
        throw new Error("Erreur lors du chargement des réservations");
      }

      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette réservation ?")) return;

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
        },
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      alert("Réservation supprimée");
      fetchReservations(); // Recharge la liste
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="div_navbar">
        <NavbarAdmin />
        <button className="button_rouge" onClick={handleDeconnexion}>
          👉 Déconnexion
        </button>
      </div>

      <main>
        <h1>Gestion des réservations</h1>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="div_tableau">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Concert</th>
                <th>Type de tarif</th>
                <th>Quantité</th>
                <th>Montant (€)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr key={reservation.id_reservation}>
                  <td>{reservations.length - index}</td>{" "}
                  {/* colonne # inversée */}
                  {/*<td>{index + 1}</td>*/}
                  <td>{reservation.nom || reservation.nom_utilisateur}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.titre || reservation.titre_concert}</td>
                  <td>{reservation.type_tarif}</td>
                  <td>{reservation.quantite || 1}</td>
                  <td>{parseFloat(reservation.montant).toFixed(2)}</td>
                  <td>
                    <button
                      className="button_tab"
                      onClick={() => handleDelete(reservation.id_reservation)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    Aucune réservation trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GestionReservations;
