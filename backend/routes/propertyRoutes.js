// backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User'); // Import User Model

// --- Multer Setup ---
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// --- Create Property Route ---
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { sellerId, title, description, price, address, bedrooms, bathrooms } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        console.log("Received sellerId:", sellerId); //  Log 1: Check sellerId

        if (!sellerId) {
            return res.status(400).json({ message: 'Seller ID is required' });
        }

        // Validate sellerId (check if the user exists)
        const user = await User.findById(sellerId);
        console.log("Found user:", user); // Log 2: Check the found user

        if (!user) {
            return res.status(404).json({ message: 'Seller not found' });
        }


        const newProperty = new Property({
            sellerId,
            title,
            description,
            price,
            address,
            imageUrl,
            bedrooms,
            bathrooms,
        });
         console.log("New property data:", newProperty); //Log 3
        await newProperty.save();
        res.status(201).json({ message: 'Property created successfully', property: newProperty });

    } catch (error) {
        console.error("Error creating property:", error);

        if (error instanceof multer.MulterError) {
            return res.status(400).json({ message: "File upload error: " + error.message });
        }
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            for (const field in error.errors) {
            validationErrors[field] = error.errors[field].message;
            }
            return res.status(400).json({ message: 'Validation Error', errors: validationErrors });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// ... (rest of your propertyRoutes.js - other routes) ...
    router.get('/my', async (req, res) => {
    try {
        const { userId } = req.query;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const properties = await Property.find({ sellerId: userId }); // Await, and use correct field name
        res.status(200).json(properties);

    } catch (error) {
        console.error("Error fetching user properties:", error); // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// --- Get All Properties Route (Corrected) ---
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find(); // Await the find operation
        res.status(200).json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error); // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// --- Get Property by ID Route (Corrected) ---
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id); // Await the findById operation
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        console.error("Error fetching property by ID:", error); // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
module.exports = router;