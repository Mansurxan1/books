import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveChanges = () => {
    console.log("Yangi sozlamalar saqlandi:", { language, darkMode });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <>
        <div className="form-group">
          <label>Language</label>
          <input type="text" value={language} disabled />
          <p className="helper-text">Please enter your first name.</p>
        </div>

        <div className="form-group">
          <label>Theme</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="submit-btn">
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </>
    </div>
  );
};

export default Settings;
