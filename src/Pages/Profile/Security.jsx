import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";

const Security = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token topilmadi!");
        return;
      }

      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); 
        
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="security-container">
      <h2>Change Or Recover Your Password:</h2>

      {!user ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user.email}/>
            <p className="helper-text">Please enter your first name.</p>
          </div>

          <div className="form-group">
            <label>Current Password</label>
            <input type="password" />
            <p className="helper-text">Please enter your password.</p>
          </div>

          <div className="password-group">
            <div className="form-group">
              <label>New Password</label>
              <input type="password" />
              <p className="helper-text">Please enter your phone number.</p>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" />
              <p className="helper-text">Please enter your email address.</p>
            </div>
          </div>

          <div className="submit-btn">
            <button>Save Changes</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Security;
