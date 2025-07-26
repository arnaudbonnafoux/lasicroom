import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
import Footer from '../../composants/Footer';
import Header from '../../composants/HeaderAdmin';

const GestionArtistes = () => {
  const [artistes, setArtistes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //fetch('http://localhost:3001/api/artistes')
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

  return (
    <div>
      <Header />
      <NavbarAdmin />

      <main>
        <h1>Gestion des artistes</h1>
        <button onClick={handleDeconnexion}>Déconnexion</button>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Style musical</th>
              <th>Description</th>
              <th>Vidéo</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Footer />
    </div>
  );
};

export default GestionArtistes;
