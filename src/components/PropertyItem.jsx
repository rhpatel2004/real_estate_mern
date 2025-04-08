// frontend/src/components/PropertyItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Global CSS

function PropertyItem({ property }) {
    return (
        <li className="property-item">
            <Link to={`/properties/${property._id}`} className="property-item-link">
           
                <img src={`${property.imageUrl}`} alt={property.title} className="property-item-image" />

                <p className="property-item-price">${property.price.toLocaleString()}</p>
                <p className="property-item-address">{property.address}</p>
            </Link>
        </li>
    );
}

export default PropertyItem;
