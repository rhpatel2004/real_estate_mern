// frontend/src/components/PropertyList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyItem from './PropertyItem';
import '../index.css';
import { useLocation } from 'react-router-dom';

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                let url = '/api/properties';
                if (location.pathname === '/my-properties') {
                    const userString = localStorage.getItem('user'); // Get as string
                    if (!userString) { // Check for null/undefined
                        setError('User data not found. Please log in again.');
                        setLoading(false);
                        return;
                    }

                    const user = JSON.parse(userString); // Parse the string
                    if (!user || !user.userId) { // Check for valid object and userId
                        setError('User data not found. Please log in again.');
                        setLoading(false);
                        return;
                    }
                    url = `/api/properties/my?userId=${user.userId}`; // Use user.userId directly

                }
                const response = await axios.get(url);
                setProperties(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load properties.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [location.pathname]);

    if (loading) {
        return <div className="property-list-loading">Loading properties...</div>;
    }

    if (error) {
        return <div className="property-list-error">Error: {error}</div>;
    }

    return (
        <div className="property-list-container">
            {properties.length === 0 ? (
                <p>No properties to display.</p>
            ) : (
                <ul className="property-list">
                    {properties.map((property) => (
                        <PropertyItem key={property._id} property={property} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PropertyList;