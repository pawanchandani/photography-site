import React, { useState } from "react";
import { getToken } from "../utils/auth";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          title,
          tags: tags.split(",").map((tag) => tag.trim()),
          imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setMessage("Photo uploaded successfully!");
      setTitle("");
      setTags("");
      setImageUrl("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "auto", paddingBottom: 20 }}>
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: 10, backgroundColor: "#2196F3", color: "white", border: "none" }}
        >
          Upload
        </button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}