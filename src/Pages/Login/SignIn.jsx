import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.scss";
import signinImage from "../../assets/images/signin.png";

const SignIn = ({ onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/login`, formData);

      if (response.data.generatetoken) {
        localStorage.setItem("token", response.data.generatetoken);

        const profileResponse = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${response.data.generatetoken}`,
          },
        });

        if (profileResponse.data) {
          localStorage.setItem("user", JSON.stringify(profileResponse.data));
          window.dispatchEvent(new Event("user-updated"));
          onClose();
          navigate("/");
        } else {
          setError("Foydalanuvchi ma'lumotlarini olishda xatolik!");
        }
      } else {
        setError(response.data.msg || "Kirishda xatolik!");
      }
    } catch (err) {
      setError("Server yoki tarmoq xatosi!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="signin">
        <div className="signin__left">
          <img src={signinImage} alt="Sign In Illustration" />
        </div>
        <div className="signin__right">
          <h1>Sign in</h1>
          <p>
            Akkountingiz yo'qmi?{" "}
            <button type="button" onClick={onSwitch}>
              Ro'yxatdan o'tish
            </button>
          </p>
          <form className="signin__form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Parol"
              onChange={handleChange}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Kirish</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
