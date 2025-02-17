import { useEffect, useState } from 'react';
import axios from 'axios';
import './Category.scss';
import Author from '../Author/Author';

const API_URL = import.meta.env.VITE_API_URL;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/categories`)
      .then((response) => {
        setCategories(response.data);
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].name);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
     console.log("Tanlangan kategoriya:", categoryName);
  };

  return (
    <section className='category'>
      <div className="container">
        <h1 className="category__title">ASOSIY KATEGORIYALAR</h1>
        <ul className='category__list'>
          {categories.map((category) => (
            <li key={category._id}>
              <button 
                onClick={() => handleCategoryClick(category.name)} 
                className={selectedCategory === category.name ? 'active' : ''}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
        <Author selectedCategory={selectedCategory} />
      </div>
    </section>
  );
};

export default Category;
