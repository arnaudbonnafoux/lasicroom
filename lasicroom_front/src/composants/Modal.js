import React from 'react';
import '../styles/modal.css';

// Composant modal
// Props : 
// - isOpen (booléen) → détermine si la fenêtre modale doit être affichée ou non
// - onClose (fonction) → callback pour fermer la modale
// - children (contenu) → tout ce qu’on veut afficher à l’intérieur du modal => Composant options dans agenda.js
function Modal({ isOpen, onClose, children }) {
  // Si isOpen est false, on ne retourne rien → la modale n'est pas affichée
  if (!isOpen) return null;

  return (
    // Overlay (arrière-plan semi-transparent)
    // Quand on clique dessus → déclenche la fermeture de la modale via onClose
    <div className="modal-overlay" onClick={onClose}>

      {/* Contenu de la modale */}
      {/* e.stopPropagation() empêche que le clic à l’intérieur ferme la modale */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>

         {/* Bouton de fermeture (croix "×") */}
        <button className="modal-close" onClick={onClose}>×</button>

        {/* children → permet d’injecter du contenu dynamique dans la modale. balise option dans la page agenda.js*/}
        {children}
      </div>
    </div>
  );
}

export default Modal;
