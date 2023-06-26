import React from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ movie, isFavorite, isLoggedIn }) {
  const handleFavoriteClick = () => {
    // Perform favorite toggle action if user is logged in
    if (isLoggedIn) {
      // Implement your logic to toggle favorite status
      console.log('Toggle favorite for movie:', movie.title);
    }
  };

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <h3>
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      </h3>
      <div className="movie-icons">
        <div className="rating">
          <FaStar className="star-icon" />
          <span>{movie.vote_average}</span>
        </div>
        <div className={`favorite ${isFavorite ? 'is-favorite' : ''}`} onClick={handleFavoriteClick}>
          <FaHeart className="heart-icon" />
        </div>
      </div>
    </div>
  );
}
