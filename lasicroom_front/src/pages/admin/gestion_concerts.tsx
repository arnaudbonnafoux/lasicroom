import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../composants/NavbarAdmin";
import HeaderAdmin from "../../composants/HeaderAdmin";
import "../../styles/gestion_concerts.css";

const GestionConcerts = () => {
  const navigate = useNavigate();

  // États principaux
  const [concerts, setConcerts] = useState([]);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour la gestion de l'édition
  const [editMode, setEditMode] = useState(false);
  const [editingConcertId, setEditingConcertId] = useState(null);

  // États pour le formulaire de création / édition
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [dateConcert, setDateConcert] = useState("");
  const [nbPlacesTotal, setNbPlacesTotal] = useState("");
  const [tarifPlein, setTarifPlein] = useState("");
  const [tarifAbonne, setTarifAbonne] = useState("");
  const [nomArtiste, setNomArtiste] = useState("");

  // État pour la modale d'édition
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Token admin pour authentification
  const token = sessionStorage.getItem("token");

  // Déconnexion : suppression du token et redirection
  const handleDeconnexion = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // Fonction pour récupérer les concerts depuis l'API
  const fetchConcerts = async () => {
    try {
      const res = await fetch("/api/concerts");
      if (!res.ok) throw new Error("Erreur lors du chargement des concerts");

      const headerToken = res.headers.get("X-CSRF-Token");
      if (headerToken) {
        setCsrfToken(headerToken);
      }

      const data = await res.json();
      setConcerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Chargement des concerts au montage du composant
  useEffect(() => {
    fetchConcerts();
  }, []);

  // Récupère un token CSRF frais si besoin avant toute mutation.
  const obtenirCsrfToken = async () => {
    if (csrfToken) return csrfToken;

    const res = await fetch("/api/concerts");
    const headerToken = res.headers.get("X-CSRF-Token");

    if (!headerToken) {
      throw new Error("Token CSRF introuvable. Rechargez la page.");
    }

    setCsrfToken(headerToken);
    return headerToken;
  };

  //Réinitialisation du formulaire après ajout / édition / annulation
  const resetForm = () => {
    setEditMode(false);
    setEditingConcertId(null);
    setTitre("");
    setDescription("");
    setDateConcert("");
    setNbPlacesTotal("");
    setTarifPlein("");
    setTarifAbonne("");
    setNomArtiste("");
  };

  // Gestion de la soumission du formulaire (ajout ou modification)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Session expirée, veuillez vous reconnecter.");
      navigate("/");
      return;
    }

    try {
      const csrf = await obtenirCsrfToken();

      // Vérifier si l'artiste existe déjà
      const artisteRes = await fetch(
        `/api/artistes?nom=${encodeURIComponent(nomArtiste)}`,
      );
      const artistes = await artisteRes.json();
      let idArtiste = artistes.length > 0 ? artistes[0].id_artiste : null;

      // Créer l’artiste si nécessaire
      if (!idArtiste) {
        const creationRes = await fetch("/api/artistes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-CSRF-Token": csrf,
          },
          body: JSON.stringify({
            nom_artiste: nomArtiste,
            style_musical: "",
            description: "",
            photo: "",
            lien_video: "",
          }),
        });

        // 🔒 Vérification des droits
        if (creationRes.status === 401) {
          alert("Vous n’êtes pas autorisé.");
          handleDeconnexion();
          return;
        }
        if (creationRes.status === 403) {
          throw new Error(
            "Action refusée (CSRF). Rechargez la page puis réessayez.",
          );
        }

        if (!creationRes.ok)
          throw new Error("Erreur lors de la création de l’artiste");
        const newArtiste = await creationRes.json();
        idArtiste = newArtiste.id_artiste;
      }

      //Préparation des données du concert
      const concertPayload = {
        titre,
        description,
        date_concert: dateConcert,
        nb_places_total: parseInt(nbPlacesTotal),
        nb_places_restantes: editMode
          ? concerts.find((c) => c.id_concert === editingConcertId)
              ?.nb_places_restantes || parseInt(nbPlacesTotal)
          : parseInt(nbPlacesTotal),
        tarif_plein: parseFloat(tarifPlein),
        tarif_abonne: parseFloat(tarifAbonne),
        id_artiste: idArtiste,
      };

      // Déterminer URL et méthode selon ajout ou édition
      const url = editMode
        ? `/api/concerts/${editingConcertId}`
        : "/api/concerts";
      const method = editMode ? "PUT" : "POST";

      // Envoi des données au serveur
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify(concertPayload),
      });

      if (res.status === 401) {
        alert("Vous n’êtes pas autorisé.");
        handleDeconnexion();
        return;
      }
      if (res.status === 403) {
        throw new Error(
          "Action refusée (CSRF). Rechargez la page puis réessayez.",
        );
      }

      if (!res.ok)
        throw new Error(
          editMode ? "Échec de la mise à jour" : "Erreur lors de la création",
        );

      alert(editMode ? "Concert mis à jour !" : "Concert ajouté !");
      resetForm();
      fetchConcerts();
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // Pré-remplissage du formulaire pour l’édition
  const handleEdit = (concert) => {
    setEditMode(true);
    setEditingConcertId(concert.id_concert);
    setTitre(concert.titre);
    setDescription(concert.description);
    setDateConcert(concert.date_concert.slice(0, 16)); // datetime-local format
    setNbPlacesTotal(concert.nb_places_total);
    setTarifPlein(concert.tarif_plein);
    setTarifAbonne(concert.tarif_abonne);
    setNomArtiste(concert.nom_artiste || "");
    setIsModalOpen(true);
  };

  // Suppression d’un concert
  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression du concert ?")) return;

    try {
      const csrf = await obtenirCsrfToken();

      const res = await fetch(`/api/concerts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-Token": csrf,
        },
      });

      if (res.status === 401) {
        alert("Vous n’êtes pas autorisé.");
        handleDeconnexion();
        return;
      }
      if (res.status === 403) {
        throw new Error(
          "Action refusée (CSRF). Rechargez la page puis réessayez.",
        );
      }

      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Concert supprimé");
      fetchConcerts();
    } catch (err) {
      alert(err.message);
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
        <h1>Gestion des concerts</h1>

        {/* Formulaire d'ajout / édition */}
        <form onSubmit={handleSubmit} className="form_ajout_concert">
          <h2 className="style_h2">
            {editMode ? "Modifier un concert" : "Ajouter un concert"}
          </h2>
          <input
            className="input_form"
            type="text"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
          <textarea
            className="textarea_form"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            className="input_form"
            type="datetime-local"
            placeholder="Date"
            value={dateConcert}
            onChange={(e) => setDateConcert(e.target.value)}
            required
          />
          <input
            className="input_form"
            type="number"
            placeholder="Places totales"
            value={nbPlacesTotal}
            onChange={(e) => setNbPlacesTotal(e.target.value)}
            required
          />
          <input
            className="input_form"
            type="number"
            placeholder="Tarif plein (€)"
            value={tarifPlein}
            onChange={(e) => setTarifPlein(e.target.value)}
            required
          />
          <input
            className="input_form"
            type="number"
            placeholder="Tarif abonné (€)"
            value={tarifAbonne}
            onChange={(e) => setTarifAbonne(e.target.value)}
            required
          />
          <input
            className="input_form"
            type="text"
            placeholder="Nom de l'artiste"
            value={nomArtiste}
            onChange={(e) => setNomArtiste(e.target.value)}
            required
          />
          <button className="button_form" type="submit">
            {editMode ? "Mettre à jour" : "Ajouter"}
          </button>
          {editMode && (
            <button
              className="button_form"
              type="button"
              onClick={() => {
                resetForm();
                setIsModalOpen(false);
              }}
            >
              Annuler
            </button>
          )}
        </form>

        {/* Liste des concerts existants */}
        <h2 className="style_h2">Liste des concerts</h2>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

        {!loading && !error && (
          <div className="div_tableau">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Places totales</th>
                  <th>Places restantes</th>
                  <th>Tarif plein</th>
                  <th>Tarif abonné</th>
                  <th>Artiste</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {concerts.map((concert, index) => (
                  <tr key={concert.id_concert}>
                    <td>{index + 1}</td>
                    <td>{concert.titre}</td>
                    <td>{concert.description}</td>
                    <td>{new Date(concert.date_concert).toLocaleString()}</td>
                    <td>{concert.nb_places_total}</td>
                    <td>{concert.nb_places_restantes}</td>
                    <td>{concert.tarif_plein} €</td>
                    <td>{concert.tarif_abonne} €</td>
                    <td>{concert.nom_artiste || "—"}</td>
                    <td>
                      <button
                        className="button_tab"
                        style={{ marginRight: "6px" }}
                        onClick={() => handleEdit(concert)}
                      >
                        Modifier
                      </button>
                      <button
                        className="button_tab"
                        style={{ marginTop: "6px" }}
                        onClick={() => handleDelete(concert.id_concert)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modale d'édition */}
        {isModalOpen && (
          <div className="modal_overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
              <h2>Modifier le concert</h2>
              <form className="form_modif_concert" onSubmit={handleSubmit}>
                <input
                  className="input_form"
                  type="text"
                  placeholder="Titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  required
                />
                <textarea
                  className="textarea_form"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <input
                  className="input_form"
                  type="datetime-local"
                  placeholder="Date"
                  value={dateConcert}
                  onChange={(e) => setDateConcert(e.target.value)}
                  required
                />
                <input
                  className="input_form"
                  type="number"
                  placeholder="Places totales"
                  value={nbPlacesTotal}
                  onChange={(e) => setNbPlacesTotal(e.target.value)}
                  required
                />
                <input
                  className="input_form"
                  type="number"
                  placeholder="Tarif plein (€)"
                  value={tarifPlein}
                  onChange={(e) => setTarifPlein(e.target.value)}
                  required
                />
                <input
                  className="input_form"
                  type="number"
                  placeholder="Tarif abonné (€)"
                  value={tarifAbonne}
                  onChange={(e) => setTarifAbonne(e.target.value)}
                  required
                />
                <input
                  className="input_form"
                  type="text"
                  placeholder="Nom de l'artiste"
                  value={nomArtiste}
                  onChange={(e) => setNomArtiste(e.target.value)}
                  required
                />
                <div className="modal_actions">
                  <button type="submit" className="button_form">
                    Mettre à jour
                  </button>
                  <button
                    type="button"
                    className="button_form"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GestionConcerts;
