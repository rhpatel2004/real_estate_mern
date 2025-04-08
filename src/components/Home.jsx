// frontend/src/components/Home.jsx
import React from 'react';
import PropertyList from './PropertyList'; // Reuse the PropertyList
import '../index.css'
function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Real Estate App</h1>
      <PropertyList /> {/* Display all properties */}
    </div>
  );
}

export default Home;