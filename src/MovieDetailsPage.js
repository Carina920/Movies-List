import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './MovieDetails.css';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    // Fetch movie details from the API using the provided endpoint
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=622300a09cd4e7b18d034abbde9bc78d`)
      .then((response) => response.json())
      .then((data) => setMovieDetails(data))
      .catch((error) => console.log(error));
  }, [movieId]);

  const handleRateChange = (e) => {
    const newRating = parseInt(e.target.value);
    setRating(newRating);
  };

  const handleRateSubmit = () => {
    if (rating) {
      // Implement your logic to submit the rating
      console.log(`Rated movie ${movieId} with score ${rating}`);
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const { poster_path, title, release_date, overview, genres, vote_average, production_companies } = movieDetails;

 return (
  <div className="movie-details-container">
    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />

    <div className="movie-details-content">
      <h3>{title}</h3>
      <p>
        <strong>Release Date:</strong> {release_date}
      </p>
      <p>
        <strong>Overview:</strong> {overview}
      </p>
      <p>
        <strong>Genres:</strong> {genres.map((genre) => genre.name).join(', ')}
      </p>
      <p>
        <strong>Average Rating:</strong> {vote_average}
      </p>
      <p>
        <strong>Your Rating:</strong> {rating !== null ? rating : 'Not yet'}
      </p>
      <div className="rating-section">
        <label htmlFor="rating-select">
          <strong>Rate it:</strong>
        </label>
        <select id="rating-select" value={rating} onChange={handleRateChange}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button onClick={handleRateSubmit}>Rate it</button>
      </div>
      <div className="production-companies">
        {production_companies.map((company) => (
          <img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} alt={company.name} />
        ))}
      </div>
    </div>
  </div>
);
}
