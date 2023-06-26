import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Home from './Home';
import MovieDetails from './MovieDetailsPage';
import LoginPage from './LoginPage';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://developers.themoviedb.org/3/movies/get-now-playing');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName('');
  };

  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} userName={userName} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/favorite">
            {/* Favorite Component */}
          </Route>
          <Route path="/rated">
            {/* Rated Component */}
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}
