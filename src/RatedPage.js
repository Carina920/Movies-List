import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RatedPage = () => {
  const [ratedMovies, setRatedMovies] = useState([]);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      // Get the session ID from local storage or a secure place
      const sessionId = localStorage.getItem('session_id');

      if (sessionId) {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/account/{account_id}/rated/movies',
            {
              params: {
                api_key: '622300a09cd4e7b18d034abbde9bc78d',
                session_id: sessionId,
              },
            }
          );

          setRatedMovies(response.data.results);
        } catch (error) {
          console.error('Error fetching rated movies:', error);
        }
      }
    };

    fetchRatedMovies();
  }, []);

  return (
    <div className="rated-page">
      <h2>Rated Movies</h2>
      <div className="movie-grid">
        {ratedMovies.map((movie) => (
          // Render movie cards here
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default RatedPage;
