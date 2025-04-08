// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'; //global css

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Real Estate App</Link>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                {user ? (
                    <>
                        {user.role === 'seller' && (
                            <>
                            <li><Link to="/add-property">Add Property</Link></li>
                            <li><Link to="/my-properties">My property</Link></li>
                            </>
                        )}

                        <li><button onClick={handleLogout} className="navbar-logout-button">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;