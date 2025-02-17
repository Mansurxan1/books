import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.scss";
import searchIcon from "@i/search.svg";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim().length > 0) { 
      navigate(`/search?q=${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <section className="search">
      <div className="container">
        <h2 className="search__title">QIDIRISH</h2>
        <form className="search__box" onSubmit={handleSearch}>
          <input
            className="search__box-inp"
            type="text"
            placeholder="Adiblar, kitoblar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search__box-btn" type="submit">
            <img src={searchIcon} alt="Search Icon" />
            Izlash
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
