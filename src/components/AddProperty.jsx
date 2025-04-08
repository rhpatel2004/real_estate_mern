// frontend/src/components/AddProperty.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function AddProperty() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        const userString = localStorage.getItem('user');
        if (!userString) {
            setError('You must be logged in as a seller to add a property.');
            return;
        }

        const user = JSON.parse(userString);
        if (!user || !user.userId) {
            setError('You must be logged in as a seller to add a property.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('address', address);
        formData.append('image', image);
        formData.append('sellerId', user.userId);
        formData.append('bedrooms', bedrooms);
        formData.append('bathrooms', bathrooms);


        try {
            const response = await axios.post('/api/properties', formData, { // Corrected URL
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log("Frontend response:", response.data); // Log the response
            setSuccess(true);
            navigate('/my-properties');

        } catch (error) {
            console.error("Frontend error:", error); //  Log the error
            console.error("Error response:", error.response); // Log the response

            setError(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div className="add-property-container">
            <h2>Add Property</h2>
            {error && <p className="add-property-error">{error}</p>}
            {success && <p className="add-property-success">Property added successfully!</p>}
            <form onSubmit={handleSubmit} className="add-property-form">
                <div className="add-property-form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="add-property-form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="add-property-form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="add-property-form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="add-property-form-group">
                    <label htmlFor="bedrooms">Bedrooms:</label>
                    <input type="number" id="bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                </div>
                <div className="add-property-form-group">
                    <label htmlFor="bathrooms">Bathrooms:</label>
                    <input type="number" id="bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                </div>
                <div className="add-property-form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="add-property-button">Add Property</button>
            </form>
        </div>
    );
}

export default AddProperty;