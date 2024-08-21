import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Animal Store</h1>
      <nav>
        <Link to="/products">View Products</Link>
        <Link to="/categories">View Categories</Link>
        <Link to="/admin">Admin Panel</Link>
      </nav>
    </div>
  );
}

export default Home;
