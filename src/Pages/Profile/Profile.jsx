import { useState, useEffect } from "react";
import axios from "axios";
import Security from "./Security";
import Settings from "./Settings";
import "./profile.scss";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);
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
        localStorage.setItem("user", JSON.stringify(response.data)); // Mahalliy saqlash
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error);
      }
    };

    fetchUserData();
  }, []);

  const tabs = [
    { id: 1, title: "My account", component: <ProfileContent user={user} /> },
    { id: 2, title: "Security", component: <Security /> },
    { id: 3, title: "Settings", component: <Settings /> },
  ];

  return (
    <div className="profile profile-container">
      <div className="profile-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-number">{tab.id}</span>
            <div className="tab-text">
              <span>{tab.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

const ProfileContent = ({ user }) => {
  if (!user) return <p>Yuklanmoqda...</p>;

  return (
    <div className="profil">
      <h2>My Profile</h2>
      <div className="profile-form">
        <div className="input-group">
          <label>First Name</label>
          <input type="text" value={user.username} disabled />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            value={user.lastname}
            disabled
            placeholder="Mavjud emas"
          />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input
            type="text"
            value={user.phone}
            disabled
            placeholder="Mavjud emas"
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="text" value={user.email} disabled />
        </div>
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
};

export default Profile;
