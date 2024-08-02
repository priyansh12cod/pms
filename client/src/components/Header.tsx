// src/components/Header/Header.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { useAuthContext } from '../context/AuthContext'; // Import the custom hook

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext(); // Use the custom hook to access context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">PMS Logo</Link>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
