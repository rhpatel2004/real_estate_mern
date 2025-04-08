// backend/models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Store filename/path
    bedrooms: { type: Number},
    bathrooms: { type: Number},
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;