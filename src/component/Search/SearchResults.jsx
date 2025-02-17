import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { searchBooks, searchAuthors, clearResults } from "@/redux/searchSlice";
import "./SearchResults.scss";
import fallbackImg from "@i/not-img.png";
import Books from "../Books/Books";
import BgImg from "../bg-img/BgImg";

const IMAGE_REPLACE_URL = import.meta.env.VITE_IMAGE_REPLACE_URL;
const LOCALHOST_URL = import.meta.env.VITE_LOCALHOST_URL;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const query = new URLSearchParams(location.search).get("q");
  const dispatch = useDispatch();
  const { books, authors, loading, error } = useSelector((state) => state.search);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showBooksOnly, setShowBooksOnly] = useState(false);

  useEffect(() => {
    if (query) {
      dispatch(clearResults());
      dispatch(searchBooks(query));
      dispatch(searchAuthors(query));
    }
  }, [query, dispatch]);

  const getImageUrl = (image) => {
    if (!image) return fallbackImg;
    if (image.includes(LOCALHOST_URL)) return image.replace(LOCALHOST_URL, IMAGE_REPLACE_URL);
    return image;
  };

  const handleAuthorClick = (authorName) => {
    setSelectedAuthor(authorName);
    setShowBooksOnly(true);
  };

  let titleText = "";
  if (books.length > 0 && authors.length > 0) {
    titleText = "Mualliflar va Kitoblar";
  } else if (books.length > 0) {
    titleText = "Kitoblar";
  } else if (authors.length > 0) {
    titleText = "Mualliflar";
  }

  return (
    <section className="search-results">
      <div className="container">
        <div className="buttons">
          {showBooksOnly ? (
            <button className="back-button" onClick={() => setShowBooksOnly(false)}>
              ← Ortga
            </button>
          ) : (
            <button className="back-button" onClick={() => navigate(-1)}>
              ← Ortga
            </button>
          )}
        </div>

        {loading && <p className="loading">Yuklanmoqda...</p>}
        {error && <p className="error">Xatolik yuz berdi: {error}</p>}

        {showBooksOnly ? (
          <Books books={books} selectedAuthor={selectedAuthor} />
        ) : (
          <div className="results">
            <h1>{titleText}</h1>

            {authors.length === 0 && books.length === 0 && !loading && (
              <p className="no-results">Natijalar topilmadi</p>
            )}
            <BgImg />
            <ul className="search-items">
              {authors.map((author) => (
                <li
                  key={author._id}
                  className="search-item"
                  onClick={() => handleAuthorClick(author.name)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="search-img">
                    <img
                      src={getImageUrl(author.image)}
                      alt={author.name}
                      onError={(e) => (e.currentTarget.src = fallbackImg)}
                    />
                  </div>
                  <h3>{author.name}</h3>
                  <p>{author.birth_year} - {author.death_year || "hozirgi"}</p>
                </li>
              ))}

              {books.map((book) => (
                <li key={book._id} className="search-item">
                  <div className="search-img">
                    <img
                      src={getImageUrl(book.image)}
                      alt={book.name}
                      onError={(e) => (e.currentTarget.src = fallbackImg)}
                    />
                  </div>
                  <h3>{book.name}</h3>
                  <p>{book.price} so'm</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
