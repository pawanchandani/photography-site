import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/photos")
      .then((res) => res.json())
      .then(setPhotos)
      .catch(console.error);
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <h2>Photo Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {photos.map(({ _id, title, tags, imageUrl }) => (
          <div
            key={_id}
            style={{
              border: "1px solid #ccc",
              margin: 10,
              padding: 10,
              width: 200,
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
              borderRadius: 6,
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 4 }}
            />
            <h4>{title}</h4>
            {tags && tags.length > 0 ? (
              <p style={{ fontSize: 12, color: "#555" }}>Tags: {tags.join(", ")}</p>
            ) : (
              <p style={{ fontSize: 12, color: "#aaa" }}>No tags</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}