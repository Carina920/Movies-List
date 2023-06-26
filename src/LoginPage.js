import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ setLoggedIn, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username && !password) {
      setError('Please enter your username and password.');
      return;
    }

    if (!username) {
      setError('Please enter a username.');
      return;
    }

    if (!password) {
      setError('Please enter a password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Get request token
      const tokenResponse = await axios.get(
        'https://api.themoviedb.org/3/authentication/token/new',
        {
          params: {
            api_key: '622300a09cd4e7b18d034abbde9bc78d',
          },
        }
      );

      const requestToken = tokenResponse.data.request_token;

      // Step 2: Validate request token
      const validateResponse = await axios.post(
        'https://api.themoviedb.org/3/authentication/token/validate_with_login',
        {
          username,
          password,
          request_token: requestToken,
        },
        {
          params: {
            api_key: '622300a09cd4e7b18d034abbde9bc78d',
          },
        }
      );

      // Step 3: Create session
      const sessionResponse = await axios.post(
        'https://api.themoviedb.org/3/authentication/session/new',
        {
          request_token: requestToken,
        },
        {
          params: {
            api_key: '622300a09cd4e7b18d034abbde9bc78d',
          },
        }
      );

      const sessionId = sessionResponse.data.session_id;

      // Step 4: Get account details
      const accountResponse = await axios.get(
        'https://api.themoviedb.org/3/account',
        {
          params: {
            api_key: '622300a09cd4e7b18d034abbde9bc78d',
            session_id: sessionId,
          },
        }
      );

      const accountId = accountResponse.data.id;

      // Update the logged-in state and store session information
      setLoggedIn(true);
      sessionStorage.setItem('session_id', sessionId);
      sessionStorage.setItem('account_id', accountId);

      // Redirect to the home page
      history.push('/');
    } catch (error) {
      setLoading(false);
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Logging in...' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
