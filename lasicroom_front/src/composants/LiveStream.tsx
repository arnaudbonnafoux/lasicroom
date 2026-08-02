// src/composants/LiveStream.js
import React, { useEffect, useState } from "react";

function LiveStream() {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/live")
      .then((res) => res.json())
      .then((data) => {
        setVideoId(data.videoId || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur récupération live :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement du live...</p>;

  if (!videoId) return <p>Aucun live en cours.</p>;

  return (
    <iframe
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.75)",
        borderRadius: "12px",
      }}
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      title="YouTube Live"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

export default LiveStream;
