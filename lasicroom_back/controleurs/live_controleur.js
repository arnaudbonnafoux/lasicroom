//const fetch = require('node-fetch');
require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

const getLiveConcert = async (req, res) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      res.json({
        videoId: data.items[0].id.videoId,
        title: data.items[0].snippet.title
      });
    } else {
      res.json({ videoId: null });
    }
  } catch (err) {
    console.error("Erreur récupération live YouTube :", err);
    res.status(500).json({ error: "Impossible de récupérer le live YouTube" });
  }
};

module.exports = getLiveConcert; // <- export direct de la fonction
