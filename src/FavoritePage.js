import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoritePage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      // Get the session ID from local storage or a secure place
      const sessionId = localStorage.getItem('session_id');

      if (sessionId) {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/account/{account_id}/favorite/movies',
            {
              params: {
                api_key: '622300a09cd4e7b18d034abbde9bc78d',
                session_id: sessionId,
              },
            }
          );

          setFavoriteMovies(response.data.results);
        } catch (error) {
          console.error('Error fetching favorite movies:', error);
        }
      }
    };

    fetchFavoriteMovies();
  }, []);

  return (
    <div className="favorite-page">
      <h2>Favorite Movies</h2>
      <div className="movie-grid">
        {favoriteMovies.map((movie) => (
          // Render movie cards here
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
