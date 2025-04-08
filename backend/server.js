// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import the path module
const app = express();
const port = 6000;

// Enable CORS for all origins (for development)
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/realEstateDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the React app's static files (for production, after building the frontend)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve the React app's index.html (for SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});