import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to the Project Management System</h1>
      <p>Your one-stop solution for managing projects effectively.</p>
      <div className="home__links">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/signup" className="btn btn-secondary">Register</Link> {/* Changed from '/register' to '/signup' */}
      </div>
    </div>
  );
};

export default Home;
