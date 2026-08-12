import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import HeaderAdmin from '../../composants/HeaderAdmin';
import NavbarAdmin from "../../composants/NavbarAdmin";
import HeaderAdmin from "../../composants/HeaderAdmin";

interface DemandeAccompagnement {
  id_demande: number;
  nom_artiste: string;
  email_artiste: string;
  style_musical: string | null;
  message: string | null;
  date_envoi: string;
}

const GestionAccompagnement = () => {
  const [demandes, setDemandes] = useState<DemandeAccompagnement[]>([]);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const navigate = useNavigate();
  // Déconnexion : suppression du token et redirection
  const handleDeconnexion = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // On récupère le token de session

    fetch("/api/accompagnements", {
      headers: {
        Authorization: `Bearer ${token}`, // On l'envoie au backend
      },
    })
      .then((response) => {
        const headerToken = response.headers.get("X-CSRF-Token");
        if (headerToken) {
          setCsrfToken(headerToken);
        }

        if (!response.ok) throw new Error("Non autorisé"); // Si la réponse n'est pas OK, on bloque
        return response.json();
      })
      .then((data) => setDemandes(data)) // On met à jour les données
      .catch((error) => {
        console.error("Erreur lors de la récupération des demandes :", error);
        alert("Accès interdit. Vous devez être administrateur.");
        navigate("/"); // Redirige vers l'accueil si non admin
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Confirmer la suppression de cette demande ?")) {
      const token = sessionStorage.getItem("token");

      try {
        let tokenCsrf = csrfToken;
        if (!tokenCsrf) {
          const tokenRes = await fetch("/api/accompagnements", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const headerToken = tokenRes.headers.get("X-CSRF-Token");
          if (headerToken) {
            tokenCsrf = headerToken;
            setCsrfToken(headerToken);
          }
        }

        const res = await fetch(`/api/accompagnements/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            ...(tokenCsrf ? { "X-CSRF-Token": tokenCsrf } : {}),
          },
        });

        if (res.ok) {
          setDemandes((prev) =>
            prev.filter((demande) => demande.id_demande !== id),
          );
          alert("Demande supprimée avec succès.");
        } else if (res.status === 401) {
          alert("Session expirée. Veuillez vous reconnecter.");
          handleDeconnexion();
        } else if (res.status === 403) {
          alert("Action refusée (CSRF). Rechargez la page puis réessayez.");
        } else {
          alert("Erreur lors de la suppression.");
        }
      } catch (error) {
        console.error("Erreur suppression :", error);
        alert("Erreur serveur lors de la suppression.");
      }
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="div_navbar">
        <NavbarAdmin />
        <button className="button_rouge" onClick={handleDeconnexion}>
          👉 Déconnexion
        </button>
      </div>

      <main>
        <h1>Gestion des demandes d'accompagnement</h1>
        <div className="div_tableau">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom artiste</th>
                <th>Email</th>
                <th>Style musical</th>
                <th>Message</th>
                <th>Date d'envoi</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande: DemandeAccompagnement, index) => (
                <tr key={demande.id_demande}>
                  {/*<td>{demande.id_demande}</td>*/}
                  <td>{index + 1}</td>
                  <td>{demande.nom_artiste}</td>
                  <td>{demande.email_artiste}</td>
                  <td>{demande.style_musical}</td>
                  <td>{demande.message}</td>
                  <td>{new Date(demande.date_envoi).toLocaleString()}</td>
                  <td>
                    <button
                      className="button_tab"
                      onClick={() => handleDelete(demande.id_demande)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GestionAccompagnement;
