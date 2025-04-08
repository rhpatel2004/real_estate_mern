// frontend/src/components/PropertyDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css'; // Global CSS

function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/properties/${id}`);
                setProperty(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load property details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return <div className="property-detail-loading">Loading property details...</div>;
    }

    if (error) {
        return <div className="property-detail-error">Error: {error}</div>;
    }

    if (!property) {
        return <div className="property-detail-not-found">Property not found.</div>;
    }

    return (
        <div className="property-detail-container">
            <img src={`${property.imageUrl}`} alt={property.title} className="property-detail-image" />                <h3 className="property-item-title">{property.title}</h3>
            <h2 className="property-detail-title">{property.title}</h2>
            <p className="property-detail-price">${property.price.toLocaleString()}</p>
            <p className="property-detail-address">{property.address}</p>
            <p className="property-detail-description">{property.description}</p>
            {property.bedrooms && <p>Bedrooms: {property.bedrooms}</p>}
            {property.bathrooms && <p>Bathrooms: {property.bathrooms}</p>}
        </div>
    );
}

export default PropertyDetail;

