import React from 'react';
import Header from '../composants/Header';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';

const MentionsLegales = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <h1>Mentions légales</h1>

        <p><strong>Éditeur du site :</strong></p>
        <p>La sicRoom Productions – SAS au capital de 10 000 €</p>
        <p>Siège social : 15 rue des Harmonies, 75011 Paris, France</p>
        <p>SIRET : 823 456 789 00015</p>
        <p>TVA intracommunautaire : FR47823456789</p>
        <p>Directrice de la publication : Claire Besson</p>
        <p>Email : contact@sicroom.fr</p>
        <p>Téléphone : +33 1 42 55 33 21</p>

        <p><strong>Hébergeur :</strong></p>
        <p>AlwaysData – 91 rue du Faubourg Saint-Honoré, 75008 Paris, France</p>
        <p>Site : www.alwaysdata.com – Tél : +33 1 84 16 23 40</p>

        <p><strong>Propriété intellectuelle :</strong></p>
        <p>
          Tous les éléments présents sur le site (textes, images, vidéos, logos, etc.) sont la propriété exclusive de la sicRoom ou de ses partenaires. Toute reproduction ou diffusion sans autorisation est strictement interdite.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
