import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../component/Header/Header";
import Home from "../Pages/Home/Home";
import SearchResults from "../component/Search/SearchResults";
import SignUp from "../Pages/Login/SignUp";
import SignIn from "../Pages/Login/SignIn";
import Profile from "../Pages/Profile/Profile";
import Settings from "../Pages/Profile/Settings";
import Security from "../Pages/Profile/Security";

function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  // text
  useEffect(() => {
    const lastClearDate = localStorage.getItem("lastClearDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastClearDate !== today) {
      localStorage.clear();
      localStorage.setItem("lastClearDate", today);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profil" element={<Profile user={user} />} />
        <Route path="/settings" element={<Settings user={user} />} />
        <Route path="/security" element={<Security user={user} />} />
      </Routes>
      {!isAuthenticated && (
        <>
          {showSignIn && (
            <SignIn
              onClose={handleLogin}
              onSwitch={() => {
                setShowSignIn(false);
                setShowSignUp(true);
              }}
            />
          )}
          {showSignUp && (
            <SignUp
              onClose={handleLogin}
              onSwitch={() => {
                setShowSignIn(true);
                setShowSignUp(false);
              }}
            />
          )}
        </>
      )}
    </BrowserRouter>
  );
}

export default AppRouter;
