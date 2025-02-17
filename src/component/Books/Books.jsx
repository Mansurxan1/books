import React from "react";
import "./Books.scss";

const IMAGE_REPLACE_URL = import.meta.env.VITE_IMAGE_REPLACE_URL;
const LOCALHOST_URL = import.meta.env.VITE_LOCALHOST_URL;

const getImageUrl = (image) => {
  if (!image) return "/fallback.jpg";
  if (image.includes(LOCALHOST_URL)) return image.replace(LOCALHOST_URL, IMAGE_REPLACE_URL);
  return image;
};

const Books = ({ books, selectedAuthor }) => {
  const filteredBooks = books.filter(
    (book) => book.author_info && book.author_info.name === selectedAuthor
  );

  return (
    <section className="book">
      <h3>Muallifning Kitoblari</h3>
      <ul className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book._id} className="book-item">
              <div className="book__item-img">
                <img src={getImageUrl(book.image)} alt={book.name} className="book-image" />
              </div>
              <div className="book-info">
                <h4 className="book-name">{book.name}</h4>
                <p className="book-price">{book.price} UZS</p>
                <p className="book-rating">Reyting: {book.rating}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="book-nobook">Muallifga tegishli kitoblar topilmadi.</p>
        )}
      </ul>
    </section>
  );
};

export default Books;
