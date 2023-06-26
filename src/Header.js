import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.svg'; // Import the logo image

export default function Header({ loggedIn, userName, handleLogout }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

    return (
      <header className="header">
        <img src={logo} alt="Logo" className="logo-image" />
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/favorite" className="nav-link">Favorite</Link>
            </li>
            <li>
              <Link to="/rated" className="nav-link">Rated</Link>
            </li>
          </ul>
        </nav>
        <div className="right-section">
            <div className="user">
              {loggedIn ? (
                <>
                  <span className="username" onClick={handleLogoutClick}>
                    {userName}
                  </span>
                  <span className="logout" onClick={handleLogoutClick}>Logout</span>
                </>
              ) : (
                <Link to="/login" className="nav-link">Login</Link>
              )}
            </div>
        </div>
      </header>
    );
}
