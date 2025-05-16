import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!image) {
      setMessage("Please select an image");
      return;
    }

    try {
      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", image);
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = imgbbRes.data.data.url;

      // Save photo metadata to backend
      await axios.post(
        "http://localhost:4000/photos",
        { title, tags: tags.split(","), imageUrl },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setMessage("Photo uploaded successfully");
      setTitle("");
      setTags("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Photo</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Photo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        /><br />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          required
        /><br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
