import { useEffect, useState } from "react";
import axios from "axios";
import "./Author.scss";
import Books from "../Books/Books";
import img from "@i/naqsh.svg";

const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_REPLACE_URL = import.meta.env.VITE_IMAGE_REPLACE_URL;
const LOCALHOST_URL = import.meta.env.VITE_LOCALHOST_URL;

const Author = ({ selectedCategory }) => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/get_authors`)
      .then((response) => {
        setAuthors(response.data.authors);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
      });
  }, []);

  useEffect(() => {
    setSelectedAuthor(null);
  }, [selectedCategory]);

  const getImageUrl = (image) => {
    if (!image) return { img }
    if (image.includes(LOCALHOST_URL)) return image.replace(LOCALHOST_URL, IMAGE_REPLACE_URL);
    return image;
  };

  const handleAuthorClick = (authorId) => {
    setSelectedAuthor(authorId);
    axios
      .get(`${API_URL}/get_books`)
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  return (
    <section className="author">
      {!selectedAuthor ? (
        <ul className="container">
          {authors
            .filter((author) => !selectedCategory || author.category === selectedCategory)
            .map((author) => (
              <li key={author._id} className="author__item" onClick={() => handleAuthorClick(author._id)}>
                <div className="author__box">
                  <div className="author__box-content">
                    <div className="author__box-img">
                      <img src={getImageUrl(author.image)} alt={author.name} />
                    </div>
                    <div className="author__box-text">
                      <div className="author__img-top"><img src={img} alt="Naqsh" /></div>
                      <h4 className="author__name">{author.name}</h4>
                      <p className="author__years">
                        {author.birth_year} - {author.death_year}
                      </p>
                      <div className="author__img-bottom"><img src={img} alt="Naqsh" /></div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div>
          <button className="back-button" onClick={() => setSelectedAuthor(null)}>
            Ortga
          </button>
          <Books books={books} selectedAuthor={authors.find((author) => author._id === selectedAuthor)?.name} />
        </div>
      )}
    </section>
  );
};

export default Author;
