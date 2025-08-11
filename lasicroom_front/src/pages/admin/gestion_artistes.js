import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
import '../../styles/gestion_artistes.css';
import HeaderAdmin from '../../composants/HeaderAdmin';

const GestionArtistes = () => {
  const navigate = useNavigate();

  const [artistes, setArtistes] = useState([]);
  const [selectedArtiste, setSelectedArtiste] = useState(null);
  const [newArtiste, setNewArtiste] = useState({
    nom_artiste: '',
    style_musical: '',
    description: '',
    photo: null,
    lien_video: ''
  });

  const [updatedPhoto, setUpdatedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchArtistes = async () => {
    try {
      const response = await fetch('/api/artistes');
      if (!response.ok) throw new Error('Erreur lors du chargement des artistes');
      const data = await response.json();
      setArtistes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArtistes();
  }, []);

  const handleDeconnexion = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleEditClick = (artiste) => {
    setSelectedArtiste({ ...artiste });
    setUpdatedPhoto(null);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom_artiste', selectedArtiste.nom_artiste);
    formData.append('style_musical', selectedArtiste.style_musical);
    formData.append('description', selectedArtiste.description);
    formData.append('lien_video', selectedArtiste.lien_video);
    if (updatedPhoto) {
      formData.append('photo', updatedPhoto);
    }

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`/api/artistes/${selectedArtiste.id_artiste}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      alert("Artiste mis à jour !");
      setIsModalOpen(false);
      setSelectedArtiste(null);
      fetchArtistes();
    } catch (err) {
      alert("Échec de la mise à jour : " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression de cet artiste ?")) return;

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`/api/artistes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      alert("Artiste supprimé !");
      fetchArtistes();
    } catch (err) {
      alert("Échec de la suppression : " + err.message);
    }
  };

  const handleAddArtiste = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom_artiste', newArtiste.nom_artiste);
    formData.append('style_musical', newArtiste.style_musical);
    formData.append('description', newArtiste.description);
    if(newArtiste.photo) {
      formData.append('photo', newArtiste.photo);
    }
    formData.append('lien_video', newArtiste.lien_video);

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch('/api/artistes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'artiste");

      alert("Artiste ajouté !");
      setNewArtiste({
        nom_artiste: '',
        style_musical: '',
        description: '',
        photo: null,
        lien_video: ''
      });
      fetchArtistes();
    } catch (err) {
      alert("Échec de l'ajout : " + err.message);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <NavbarAdmin />

      <main>
        <h1>Gestion des artistes</h1>

        {/* Formulaire d'ajout */}
        <form className='form_ajout_artiste' onSubmit={handleAddArtiste} encType="multipart/form-data">
          <h2 className='style_h2'>Ajouter un artiste</h2>
          <input
            className='input_form'
            type="text"
            placeholder="Nom"
            value={newArtiste.nom_artiste}
            onChange={(e) => setNewArtiste({ ...newArtiste, nom_artiste: e.target.value })}
            required
          />
          <input
            className='input_form'
            type="text"
            placeholder="Style musical"
            value={newArtiste.style_musical}
            onChange={(e) => setNewArtiste({ ...newArtiste, style_musical: e.target.value })}
          />
          <textarea
            className='textarea_form'
            placeholder="Description"
            value={newArtiste.description}
            onChange={(e) => setNewArtiste({ ...newArtiste, description: e.target.value })}
          />
          <input
            className='input_form'
            type="file"
            accept="image/*"
            onChange={(e) => setNewArtiste({ ...newArtiste, photo: e.target.files[0] })}
            required
          />
          <input
            className='input_form'
            type="text"
            placeholder="Lien vidéo"
            value={newArtiste.lien_video}
            onChange={(e) => setNewArtiste({ ...newArtiste, lien_video: e.target.value })}
          />
          <button className='button_form' type="submit">Ajouter l'artiste</button>
        </form>

        {/* Modale de modification */}
        {isModalOpen && selectedArtiste && (
          <div
            className="modal_overlay"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedArtiste(null);
            }}
          >
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
              <h2 className='style_h2'>Modifier un artiste</h2>
              <form className='form_modif_artiste' onSubmit={handleUpdate} encType="multipart/form-data">
                <input
                  className='input_form'
                  type="text"
                  value={selectedArtiste.nom_artiste || ''}
                  onChange={e => setSelectedArtiste({ ...selectedArtiste, nom_artiste: e.target.value })}
                  required
                />
                <input
                  className='input_form'
                  type="text"
                  value={selectedArtiste.style_musical || ''}
                  onChange={e => setSelectedArtiste({ ...selectedArtiste, style_musical: e.target.value })}
                />
                <textarea
                  className='textarea_form'
                  value={selectedArtiste.description || ''}
                  onChange={e => setSelectedArtiste({ ...selectedArtiste, description: e.target.value })}
                />
                <input
                  className='input_form'
                  type="file"
                  accept="image/*"
                  onChange={e => setUpdatedPhoto(e.target.files[0])}
                />
                <input
                  className='input_form'
                  type="text"
                  value={selectedArtiste.lien_video || ''}
                  onChange={e => setSelectedArtiste({ ...selectedArtiste, lien_video: e.target.value })}
                />
                <div className='modal_actions'>
                  <button className='button_form' type="submit">Valider</button>
                  <button className='button_form button_supprimer' type="button" onClick={() => {
                    setIsModalOpen(false);
                    setSelectedArtiste(null);
                  }}>Annuler</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <h2 className='style_h2'>Liste des artistes</h2>
        <div className="div_tableau">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Style</th>
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
                  <td>{artiste.lien_video ? (
                    <a href={artiste.lien_video} target="_blank" rel="noopener noreferrer">Voir</a>
                  ) : '—'}</td>
                  <td>
                    <button className='button_table' onClick={() => handleEditClick(artiste)}>Modifier</button>
                    <button className='button_table button_supprimer' onClick={() => handleDelete(artiste.id_artiste)}>Supprimer</button>
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
    </div>
  );
};

export default GestionArtistes;


/*
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from '../../composants/NavbarAdmin';
import '../../styles/gestion_artistes.css';
import HeaderAdmin from '../../composants/HeaderAdmin';

const GestionArtistes = () => {
  const navigate = useNavigate();

  const [artistes, setArtistes] = useState([]);
  const [selectedArtiste, setSelectedArtiste] = useState(null);
  const [newArtiste, setNewArtiste] = useState({
    nom_artiste: '',
    style_musical: '',
    description: '',
    photo: null,
    lien_video: ''
  });

  const [updatedPhoto, setUpdatedPhoto] = useState(null);
  const fetchArtistes = async () => {
    try {
      const response = await fetch('/api/artistes');
      if (!response.ok) throw new Error('Erreur lors du chargement des artistes');
      const data = await response.json();
      setArtistes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArtistes();
  }, []);

  const handleDeconnexion = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleEditClick = (artiste) => {
    setSelectedArtiste({ ...artiste });
    setUpdatedPhoto(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom_artiste', selectedArtiste.nom_artiste);
    formData.append('style_musical', selectedArtiste.style_musical);
    formData.append('description', selectedArtiste.description);
    formData.append('lien_video', selectedArtiste.lien_video);
    if (updatedPhoto) {
      formData.append('photo', updatedPhoto);
    }

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`/api/artistes/${selectedArtiste.id_artiste}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      alert("Artiste mis à jour !");
      setSelectedArtiste(null);
      fetchArtistes();
    } catch (err) {
      alert("Échec de la mise à jour : " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression de cet artiste ?")) return;

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`/api/artistes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      alert("Artiste supprimé !");
      fetchArtistes();
    } catch (err) {
      alert("Échec de la suppression : " + err.message);
    }
  };

  const handleAddArtiste = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom_artiste', newArtiste.nom_artiste);
    formData.append('style_musical', newArtiste.style_musical);
    formData.append('description', newArtiste.description);
    formData.append('photo', newArtiste.photo);
    formData.append('lien_video', newArtiste.lien_video);

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch('/api/artistes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de l'artiste");

      alert("Artiste ajouté !");
      setNewArtiste({
        nom_artiste: '',
        style_musical: '',
        description: '',
        photo: null,
        lien_video: ''
      });
      fetchArtistes();
    } catch (err) {
      alert("Échec de l'ajout : " + err.message);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <NavbarAdmin />

      <main>
        <h1>Gestion des artistes</h1>

   
        <form className='form_ajout_artiste' onSubmit={handleAddArtiste} encType="multipart/form-data">
          <h2 className='style_h2'>Ajouter un artiste</h2>
          <input className='input_form' type="text" placeholder="Nom" value={newArtiste.nom_artiste} onChange={(e) => setNewArtiste({ ...newArtiste, nom_artiste: e.target.value })} required />
          <input className='input_form' type="text" placeholder="Style musical" value={newArtiste.style_musical} onChange={(e) => setNewArtiste({ ...newArtiste, style_musical: e.target.value })} />
          <textarea className='textarea_form' placeholder="Description" value={newArtiste.description} onChange={(e) => setNewArtiste({ ...newArtiste, description: e.target.value })} />
          <input className='input_form' type="file" accept="image/*" onChange={(e) => setNewArtiste({ ...newArtiste, photo: e.target.files[0] })} required />
          <input className='input_form' type="text" placeholder="Lien vidéo" value={newArtiste.lien_video} onChange={(e) => setNewArtiste({ ...newArtiste, lien_video: e.target.value })} />
          <button className='button_form' type="submit">Ajouter l'artiste</button>
        </form>


        {selectedArtiste && (
          <form className='form_modif_artiste' onSubmit={handleUpdate} encType="multipart/form-data">
            <h2 className='style_h2'>Modifier un artiste</h2>

            <input className='input_form' type="text" value={selectedArtiste.nom_artiste || ''} onChange={e => setSelectedArtiste({ ...selectedArtiste, nom_artiste: e.target.value })} />
            <input className='input_form' type="text" value={selectedArtiste.style_musical || ''} onChange={e => setSelectedArtiste({ ...selectedArtiste, style_musical: e.target.value })} />
            <textarea className='textarea_form' value={selectedArtiste.description || ''} onChange={e => setSelectedArtiste({ ...selectedArtiste, description: e.target.value })} />
            <input className='input_form' type="file" accept="image/*" onChange={(e) => setUpdatedPhoto(e.target.files[0])} />
            <input className='input_form' type="text" value={selectedArtiste.lien_video || ''} onChange={e => setSelectedArtiste({ ...selectedArtiste, lien_video: e.target.value })} />

            <div className='div_button'>
              <button className='button_form' type="submit">Valider</button>
              <button className='button_form' type="button" onClick={() => setSelectedArtiste(null)}>Annuler</button>
            </div>
          </form>
        )}

        <h2 className='style_h2'>Liste des artistes</h2>
        <div className="div_tableau">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Style</th>
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
                  <td>{artiste.lien_video ? (
                    <a href={artiste.lien_video} target="_blank" rel="noopener noreferrer">Voir</a>
                  ) : '—'}</td>
                  <td>
                    <button className='button_table' onClick={() => handleEditClick(artiste)}>Modifier</button>
                    <button className='button_table button_supprimer' onClick={() => handleDelete(artiste.id_artiste)}>Supprimer</button>
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
    </div>
  );
};

export default GestionArtistes;
*/
