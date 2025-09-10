require('dotenv').config(); 
// Charge les variables d'environnement depuis un fichier .env
// (ici on utilise notamment YOUTUBE_API_KEY)

const API_KEY = process.env.YOUTUBE_API_KEY; 
// Récupère la clé API YouTube depuis les variables d'environnement (.env)

const VIDEO_ID = 'xORCbIptqcc'; 
// L’ID de la vidéo spécifique que tu veux utiliser (ici Lofi Girl)

// Contrôleur Express qui récupère les infos d'une vidéo YouTube
const getLiveConcert = async (req, res) => {
  try {
    // Appel à l’API YouTube Data v3 pour récupérer les infos de la vidéo
    // "part=snippet" → permet de récupérer titre, description, thumbnails, etc.
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${VIDEO_ID}&key=${API_KEY}`
    );

    // Conversion de la réponse en JSON
    const videoData = await videoResponse.json();

    // Vérifie si une vidéo a bien été trouvée
    if (videoData.items && videoData.items.length > 0) {
      const snippet = videoData.items[0].snippet; // extrait les métadonnées principales

      // On renvoie au client un objet JSON avec les infos utiles
      res.json({
        videoId: VIDEO_ID,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url
      });
    } else {
      // Aucun résultat trouvé (ex: mauvais ID vidéo)
      res.json({ videoId: null });
    }
  } catch (err) {
    // En cas d'erreur (problème réseau, API down, mauvaise clé…)
    console.error("Erreur récupération vidéo YouTube :", err);
    res.status(500).json({ error: "Impossible de récupérer la vidéo YouTube" });
  }
};

// Export de la fonction.
module.exports = getLiveConcert;
