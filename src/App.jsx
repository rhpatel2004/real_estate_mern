// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import AddProperty from './components/AddProperty';
import Navbar from './components/Navbar';
import './index.css'; // Import Global CSS.

function App() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/properties" element={<PropertyList />} />
                    <Route path="/properties/:id" element={<PropertyDetail />} />
                    <Route path="/add-property" element= {<AddProperty/>} /> 
                    <Route path="/my-properties" element= {<PropertyList/> }/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;