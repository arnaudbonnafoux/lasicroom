// ... imports inchangés
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
//import Footer from '../../composants/Footer';
import HeaderAdmin from '../../composants/HeaderAdmin';
import '../../styles/gestion_concerts.css';

const GestionConcerts = () => {
  const navigate = useNavigate();
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editingConcertId, setEditingConcertId] = useState(null);

  // Form state
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateConcert, setDateConcert] = useState('');
  const [nbPlacesTotal, setNbPlacesTotal] = useState('');
  const [tarifPlein, setTarifPlein] = useState('');
  const [tarifAbonne, setTarifAbonne] = useState('');
  const [nomArtiste, setNomArtiste] = useState('');

  const handleDeconnexion = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const fetchConcerts = async () => {
    try {
      const response = await fetch('/api/concerts');
      if (!response.ok) throw new Error('Erreur lors du chargement des concerts');
      const data = await response.json();
      setConcerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const artisteRes = await fetch(`/api/artistes?nom=${encodeURIComponent(nomArtiste)}`);
      const artistes = await artisteRes.json();
      let idArtiste = artistes.length > 0 ? artistes[0].id_artiste : null;

      if (!idArtiste) {
        const creationRes = await fetch('/api/artistes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            nom_artiste: nomArtiste,
            style_musical: '',
            description: '',
            photo: '',
            lien_video: '',
          }),
        });

        if (!creationRes.ok) throw new Error('Erreur lors de la création de l’artiste');
        const newArtiste = await creationRes.json();
        idArtiste = newArtiste.id_artiste;
      }

      const concertPayload = {
        titre,
        description,
        date_concert: dateConcert,
        nb_places_total: parseInt(nbPlacesTotal),
        nb_places_restantes: parseInt(nbPlacesTotal),
        tarif_plein: parseFloat(tarifPlein),
        tarif_abonne: parseFloat(tarifAbonne),
        id_artiste: idArtiste,
      };

      if (editMode && editingConcertId) {
        // PUT
        const res = await fetch(`/api/concerts/${editingConcertId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify(concertPayload),
        });

        if (!res.ok) throw new Error("Échec de la mise à jour");
        alert("Concert mis à jour !");
      } else {
        // POST
        const res = await fetch('/api/concerts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify(concertPayload),
        });

        if (!res.ok) throw new Error("Erreur lors de la création du concert");
        alert("Concert ajouté !");
      }

      resetForm();
      fetchConcerts();

    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (concert) => {
    setEditMode(true);
    setEditingConcertId(concert.id_concert);
    setTitre(concert.titre);
    setDescription(concert.description);
    setDateConcert(concert.date_concert.slice(0, 16)); // pour datetime-local
    setNbPlacesTotal(concert.nb_places_total);
    setTarifPlein(concert.tarif_plein);
    setTarifAbonne(concert.tarif_abonne);
    setNomArtiste(concert.nom_artiste || '');
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression du concert ?")) return;

    try {
      const res = await fetch(`/api/concerts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");
      alert("Concert supprimé");
      fetchConcerts();
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setEditingConcertId(null);
    setTitre('');
    setDescription('');
    setDateConcert('');
    setNbPlacesTotal('');
    setTarifPlein('');
    setTarifAbonne('');
    setNomArtiste('');
  };

  return (
    <div>
      <HeaderAdmin />
      <NavbarAdmin />

      <main>
        <h1>Gestion des concerts</h1>
        {/*<h2 className='style_h2'>{editMode ? "Modifier un concert" : "Ajouter un concert"}</h2>*/}
        <form onSubmit={handleSubmit} className="form_ajout_concert">
          <h2 className='style_h2'>{editMode ? "Modifier un concert" : "Ajouter un concert"}</h2>
          <input className='input_form' type="text" placeholder="Titre" value={titre} onChange={e => setTitre(e.target.value)} required />
          <textarea className='textarea_form' placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          <input className='input_form' type="datetime-local" value={dateConcert} onChange={e => setDateConcert(e.target.value)} required />
          <input className='input_form' type="number" placeholder="Places totales" value={nbPlacesTotal} onChange={e => setNbPlacesTotal(e.target.value)} required />
          <input className='input_form' type="number" placeholder="Tarif plein (€)" value={tarifPlein} onChange={e => setTarifPlein(e.target.value)} required />
          <input className='input_form' type="number" placeholder="Tarif abonné (€)" value={tarifAbonne} onChange={e => setTarifAbonne(e.target.value)} required />
          <input className='input_form' type="text" placeholder="Nom de l'artiste" value={nomArtiste} onChange={e => setNomArtiste(e.target.value)} required />
          <button className='button_form' type="submit">{editMode ? "Mettre à jour" : "Ajouter"}</button>
          {editMode && <button className='button_form' type="button" onClick={resetForm}>Annuler</button>}
        </form>

        <h2 className='style_h2'>Liste des concerts</h2>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

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
                    <td>{concert.nom_artiste || '—'}</td>
                    <td>
                      <button className='button_table' onClick={() => handleEdit(concert)}>Modifier</button>
                      <button className='button_table' onClick={() => handleDelete(concert.id_concert)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <button onClick={handleDeconnexion}>Déconnexion</button>
        </div>
      </main>

      {/*<Footer />*/}
    </div>
  );
};

export default GestionConcerts;

