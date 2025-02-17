import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BooksAll.scss";
import { FaStar } from "react-icons/fa";
import img from "@i/not-img.png";

const API_URL = import.meta.env.VITE_API_URL;
const IMAGE_REPLACE_URL = import.meta.env.VITE_IMAGE_REPLACE_URL;
const LOCALHOST_URL = import.meta.env.VITE_LOCALHOST_URL;

const BooksAll = ({ selectedAuthor }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/get_books`)
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.error("Kitoblarni yuklashda xatolik:", error);
      });
  }, []);

  const getImageUrl = (image) => {
    if (!image) return img; 
    if (image.includes(LOCALHOST_URL)) return image.replace(LOCALHOST_URL, IMAGE_REPLACE_URL);
    return image;
  };

  return (
    <div className="books">
      <div className="container">
        <h2>{selectedAuthor ? `${selectedAuthor}ning kitoblari` : "Barcha Kitoblar"}</h2>
        <div className="books-list">
          {books
            .filter((book) => !selectedAuthor || book.author_info?.name === selectedAuthor)
            .map((book) => (
              <div key={book._id} className="book-card">
                <div className="book-img">
                  <img 
                    src={getImageUrl(book.image)} 
                    alt={book.name} 
                    className="book-image" 
                    onError={(e) => e.currentTarget.src = img} 
                  />
                </div>
                <div className="book-info">
                  <h3>{book.name}</h3>
                  <p><strong>Narx:</strong> {book.price} so‘m</p>
                  {book.author_info && <p> {book.author_info.name}</p>}
                  <p><FaStar className="star" /> {book.rating}</p>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksAll;
