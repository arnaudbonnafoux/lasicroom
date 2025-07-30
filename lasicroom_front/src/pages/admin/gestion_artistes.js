import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
//import Footer from '../../composants/Footer';
//import Header from '../../composants/HeaderAdmin';

const GestionArtistes = () => {
  const [artistes, setArtistes] = useState([]);
  const [selectedArtiste, setSelectedArtiste] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/artistes')
      .then(response => {
        if (!response.ok) throw new Error('Erreur lors du chargement des artistes');
        return response.json();
      })
      .then(data => setArtistes(data))
      .catch(error => console.error(error));
  }, []);

  const handleDeconnexion = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleEditClick = (artiste) => {
    setSelectedArtiste({ ...artiste }); // clone pour édition locale
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/artistes/${selectedArtiste.id_artiste}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedArtiste)
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      alert("Artiste mis à jour !");
      setSelectedArtiste(null);
      const res = await fetch('/api/artistes');
      const data = await res.json();
      setArtistes(data);

    } catch (err) {
      alert("Échec de la mise à jour : " + err.message);
    }
  };

  return (
    <div>
      {/*<Header />*/}
      <NavbarAdmin />

      <main>
        <h1>Gestion des artistes</h1>

        {selectedArtiste && (
          <form onSubmit={handleUpdate} className="form-edition">
            <h2>Modifier un artiste</h2>
            <label>Nom :
              <input
                type="text"
                value={selectedArtiste.nom_artiste || ''}
                onChange={e => setSelectedArtiste({ ...selectedArtiste, nom_artiste: e.target.value })}
              />
            </label>
            <label>Style musical :
              <input
                type="text"
                value={selectedArtiste.style_musical || ''}
                onChange={e => setSelectedArtiste({ ...selectedArtiste, style_musical: e.target.value })}
              />
            </label>
            <label>Description :
              <textarea
                value={selectedArtiste.description || ''}
                onChange={e => setSelectedArtiste({ ...selectedArtiste, description: e.target.value })}
              />
            </label>
            <label>Photo :
              <input
                type="text"
                value={selectedArtiste.photo || ''}
                onChange={e => setSelectedArtiste({ ...selectedArtiste, photo: e.target.value })}
              />
            </label>
            <label>Lien vidéo :
              <input
                type="text"
                value={selectedArtiste.lien_video || ''}
                onChange={e => setSelectedArtiste({ ...selectedArtiste, lien_video: e.target.value })}
              />
            </label>
            <div style={{ marginTop: '12px' }}>
              <button type="submit">Valider la modification</button>
              <button type="button" onClick={() => setSelectedArtiste(null)} style={{ marginLeft: '8px' }}>Annuler</button>
            </div>
          </form>
        )}

        <div className='div_tableau'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Style musical</th>
                <th>Description</th>
                <th>Vidéo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {artistes.map((artiste, index) => (
                <tr key={artiste.id_artiste}>
                  <td>{index + 1}</td>
                  <td>{artiste.nom_artiste}</td>
                  <td>{artiste.style_musical}</td>
                  <td>{artiste.description}</td>
                  <td>
                    {artiste.lien_video ? (
                      <a href={artiste.lien_video} target="_blank" rel="noopener noreferrer">Voir</a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(artiste)}>Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
          <button onClick={handleDeconnexion}>Déconnexion</button>
        </div>
      </main>

      {/*<Footer />*/}
    </div>
  );
};

export default GestionArtistes;
