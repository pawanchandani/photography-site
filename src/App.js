import React, { useState } from "react";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";
import { isLoggedIn, removeToken } from "./utils/auth";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>Logout</button>
      <Upload />
      <hr />
      <Gallery />
    </div>
  );
}