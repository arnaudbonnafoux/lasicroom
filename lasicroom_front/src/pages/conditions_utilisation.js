import React from 'react';
import Header from '../composants/Header';
import Navbar from '../composants/Navbar';
import Footer from '../composants/Footer';

const ConditionsUtilisation = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <h1>Conditions Générales d’Utilisation</h1>

        <section>
          <p><strong>1. Objet :</strong>  
          Le site <em>sicRoom</em> permet aux utilisateurs de consulter la programmation des concerts et de réserver des billets en ligne.</p>

          <p><strong>2. Accès au site :</strong>  
          Le site est librement accessible. Toutefois, certaines fonctionnalités, notamment la réservation, nécessitent la création d’un compte utilisateur.</p>

          <p><strong>3. Réservation :</strong>  
          Les billets sont envoyés par e-mail au format PDF, incluant un QR code unique. Toute réservation est considérée comme définitive après validation du paiement.</p>

          <p><strong>4. Responsabilité :</strong>  
          La sicRoom décline toute responsabilité en cas d’interruption, de dysfonctionnement ou d’inaccessibilité temporaire du site, notamment en raison de maintenance ou de force majeure.</p>

          <p><strong>5. Données personnelles :</strong>  
          Conformément au Règlement Général sur la Protection des Données (RGPD), vos données personnelles sont utilisées uniquement pour la gestion de votre compte, le traitement de vos réservations et, si vous y avez consenti, l’envoi d’informations par e-mail. Vous pouvez exercer vos droits à tout moment (accès, rectification, suppression) en nous contactant.</p>

          <p><strong>6. Cookies :</strong>  
          Ce site utilise uniquement des cookies strictement nécessaires à son bon fonctionnement (connexion utilisateur, sécurité, préférences de navigation). Aucun cookie de suivi publicitaire ou d’analyse n’est utilisé.</p>

          <p><strong>7. Droit applicable :</strong>  
          Le site et ses conditions d’utilisation sont régis par le droit français. En cas de litige, les tribunaux compétents de Paris seront seuls habilités.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConditionsUtilisation;
