// API: 622300a09cd4e7b18d034abbde9bc78d
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import MovieCard from './MovieCard';
import { FaStar, FaHeart } from 'react-icons/fa';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('now_playing');
  const [categoryDataCache, setCategoryDataCache] = useState({});

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCategory]);

  const fetchData = async () => {
    if (categoryDataCache[selectedCategory] && categoryDataCache[selectedCategory][currentPage]) {
      setMovies(categoryDataCache[selectedCategory][currentPage]);
    } else {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${selectedCategory}`, {
          params: {
            api_key: '622300a09cd4e7b18d034abbde9bc78d',
            page: currentPage,
          },
        });

        const newMovies = response.data.results;
        setMovies(newMovies);

        setCategoryDataCache((prevCache) => ({
          ...prevCache,
          [selectedCategory]: {
            ...prevCache[selectedCategory],
            [currentPage]: newMovies,
          },
        }));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <div className="category-selector">
        <label htmlFor="category">Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="now_playing">Now playing</option>
          <option value="top_rated">Top rated</option>
          <option value="popular">Popular</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button className="prev-btn" onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
        )}
        <span>Page {currentPage}</span>
        <button className="next-btn" onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
      <div className="movies-grid">
        {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={false} // Pass the favorite status of the movie
              isLoggedIn={false} // Pass the login status of the user
            />
        ))}
      </div>
    </div>
  );
}
