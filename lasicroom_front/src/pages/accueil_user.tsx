import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../composants/NavbarUser";
import Footer from "../composants/Footer";
import HeaderUser from "../composants/HeaderUser";
import "../styles/accueil.css";
import LiveStream from "../composants/LiveStream";
import HelmetWrapper from "../composants/HelmetWrapper";

const AccueilUser = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <HelmetWrapper
        title="Accueil - Espace Personnel"
        description="Découvrez la programmation musicale de la sicRoom et réservez vos places en ligne."
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
      <main>
        <h1>Bienvenue sur ton Espace Perso !</h1>

        <div className="div_accueil">
          <div className="div_image">
            <img
              className="image_présentation"
              style={{ boxShadow: "0 8px 16px rgba(0, 0, 0, 0.75)" }}
              src="/images/photo_10.jpg"
              alt="Concert"
            />
          </div>

          <div className="texte">
            <h2 style={{ textAlign: "center" }}>Un espace perso !?</h2>
            <p style={{ padding: "12px" }}>
              Grâce à cet espace, tu as la possibilité d'accéder à la
              billetterie sans te connecter et surtout à un récapitulatif de
              toutes tes réservations. En plus de ces fonctionnalités de base,
              tu auras accès à notre <strong>live streaming</strong> qui te
              permettra de suivre les balances des groupes programmés à la
              sicRoom. Elles se déroulent généralement <strong>à 18h</strong> et
              sont une occasion de découvrir les coulisses et le off des groupes
              juste avant leur show...
            </p>
          </div>

          <div className="info">
            <h2 style={{ textAlign: "center" }}>⚠️ Infos !</h2>
            <ul className="animation_1">
              <li>
                <strong>
                  Prochain concert : le Samedi 21 mai avec Titi et son orchestre
                  !
                </strong>
              </li>
              <li>
                <strong>Le concert de Kamélia est annulé.</strong>
              </li>
              <li>
                <strong>
                  Inline Block trio sera en résidence le jeudi 17 juin.
                </strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="div_live_streaming">
          <div className="div_frame">
            <h2 style={{ textAlign: "center" }}>
              Le direct live des balances !
            </h2>
            <LiveStream />
          </div>
          <div className="div_frame">
            <h2 style={{ textAlign: "center" }}>Playlist de nos artistes !</h2>
            <iframe
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.75)",
                borderRadius: "12px",
                border: "none",
              }}
              width="560"
              height="315"
              src="https://widget.deezer.com/widget/dark/playlist/1973876342"
              title="Playlist Deezer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccueilUser;
