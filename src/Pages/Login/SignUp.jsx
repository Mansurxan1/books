import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.scss";
import signupImage from "../../assets/images/signup.png";

const SignUp = ({ onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState({
    email: "",
    code: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isVerifying holati o‘zgardi:", isVerifying);
  }, [isVerifying]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerifyChange = (e) => {
    setVerificationData({
      ...verificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log("API URL:", API_URL);

      const response = await axios.post(
        `${API_URL}/register`,
        { ...formData, role: "user" },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Register API Response:", response.data);

      setIsVerifying(true);
      setVerificationData({ email: formData.email, code: "" });
    } catch (err) {
      console.log("Xato tafsilotlari:", err.response?.data);
      setError(
        err.response?.data?.message ||
          "Xatolik yuz berdi, qayta urinib ko‘ring!"
      );
      setIsVerifying(true);
      setVerificationData({ email: formData.email, code: "" });
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log("Verify API URL:", API_URL);

      const response = await axios.post(
        `${API_URL}/verify`,
        {
          email: verificationData.email,
          code: Number(verificationData.code), 
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Verify API Response:", response.data);

      if (response.data.msg === "User verified successfully") {
        console.log("Tasdiqlash muvaffaqiyatli!");

        if (onSwitch) {
          onSwitch(); 
        } else {
          console.error("onSwitch funksiyasi aniqlanmagan!");
        }
      } else {
        setError(response.data.msg || "Kod noto‘g‘ri!");
      }
    } catch (err) {
      console.log("Verification Error:", err.response?.data);
      setError(
        err.response?.data?.message ||
          "Xatolik yuz berdi, qayta urinib ko‘ring!"
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="signup">
        <div className="signup__left">
          <img src={signupImage} alt="Sign Up Illustration" />
        </div>
        <div className="signup__right">
          {!isVerifying ? (
            <>
              <h2>Ro‘yxatdan o‘tish</h2>
              <p>
                Hisobingiz bormi?{" "}
                <button type="button" onClick={onSwitch}>
                  Kirish
                </button>
              </p>
              <form className="signup__form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Foydalanuvchi nomi"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Parol"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Ro‘yxatdan o‘tish</button>
              </form>
            </>
          ) : (
            <>
              <h2>Emailni tasdiqlang</h2>
              <p>Emailga yuborilgan kodni kiriting:</p>
              <form className="signup__form" onSubmit={handleVerifySubmit}>
                <input
                  type="email"
                  name="email"
                  value={verificationData.email}
                  disabled
                />
                <input
                  type="text"
                  name="code"
                  placeholder="Tasdiqlash kodi"
                  value={verificationData.code || ""}
                  onChange={handleVerifyChange}
                  required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Tasdiqlash</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
