import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../composants/NavbarUser";
import Footer from "../composants/Footer";
import HeaderUser from "../composants/HeaderUser";
import "../styles/gestion_reservations.css";
import HelmetWrapper from "../composants/HelmetWrapper";

interface Reservation {
  id_reservation: number;
  titre?: string;
  concert?: string;
  date_concert: string;
  type_tarif: string;
  quantite?: number;
  montant: number | string;
  date_reservation: string;
}

interface UtilisateurSession {
  id_utilisateur?: number;
  nom?: string;
  email?: string;
  role?: string;
}

const Dashboard = () => {
  // État qui contient toutes les réservations de l’utilisateur
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [erreur, setErreur] = useState<string>("");

  // Récupération du token d’authentification stocké en session
  const token = sessionStorage.getItem("token");
  const utilisateurSession: UtilisateurSession | null = (() => {
    try {
      const brut = sessionStorage.getItem("utilisateur");
      return brut ? (JSON.parse(brut) as UtilisateurSession) : null;
    } catch {
      return null;
    }
  })();

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/"); // Retour à la racine
  };

  // Chargement des réservations utilisateur au montage du composant
  useEffect(() => {
    if (!token) {
      setReservations([]);
      setErreur("Utilisateur non connecté.");
      return;
    }

    fetch("/api/reservations/mine", {
      headers: { Authorization: `Bearer ${token}` }, // Auth via token
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Impossible de charger les réservations.");
        }
        return res.json();
      })
      .then((data) => {
        const liste = Array.isArray(data) ? data : [];
        // Tri défensif côté front: plus récentes d'abord.
        liste.sort((a: Reservation, b: Reservation) => {
          const dateA = new Date(a.date_reservation).getTime();
          const dateB = new Date(b.date_reservation).getTime();
          if (dateA !== dateB) {
            return dateB - dateA;
          }
          return b.id_reservation - a.id_reservation;
        });
        setReservations(liste);
        setErreur("");
      })
      .catch((error: Error) => {
        console.error(error);
        setErreur(error.message);
      });
  }, [token]); // Dépendance = relance si le token change

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <HelmetWrapper
        title="Dashboard - Espace personnel"
        description="Découvrez les services d'accompagnement de La Sicroom pour les artistes et les événements musicaux."
      />
      <HeaderUser />
      <div
        className="div_navbar"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <NavbarUser />
        <button className="button_rouge" onClick={handleLogout}>
          👉 Déconnexion
        </button>
      </div>

      <main style={{ flex: 1 }}>
        <h1>Mes réservations</h1>
        <p style={{ textAlign: "center", margin: "0 0 12px 0" }}>
          Compte connecté : {utilisateurSession?.nom || "inconnu"}
          {utilisateurSession?.id_utilisateur
            ? ` (#${utilisateurSession.id_utilisateur})`
            : ""}
          {" - "}
          {reservations.length} réservation(s) chargée(s)
        </p>
        <div className="div_tableau">
          {/* Tableau des réservations */}
          <table className="div_tableau">
            <thead>
              <tr>
                <th>#</th>
                <th>Concert</th>
                <th>Date concert</th>
                <th>Tarif</th>
                <th>Quantité</th>
                <th>Montant (€)</th>
                <th>Date réservation</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r, i) => (
                <tr key={r.id_reservation}>
                  {/* Numérotation décroissante : total en haut, 1 en bas */}
                  <td>{reservations.length - i}</td>

                  <td>{r.titre || r.concert || "Concert"}</td>
                  <td>{new Date(r.date_concert).toLocaleDateString()}</td>
                  <td>{r.type_tarif}</td>
                  <td>{r.quantite || 1}</td>
                  <td>{Number(r.montant).toFixed(2)}</td>
                  <td>{new Date(r.date_reservation).toLocaleDateString()}</td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    {erreur || "Aucune réservation pour le moment."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
