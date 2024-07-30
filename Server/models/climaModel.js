const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ClimateSchema = new mongoose.Schema({
    owner: {
        type: ObjectId,
        ref: 'User', 
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    coolingCapacity: {
        type: String,
        required: true
    },
    heatingCapacity: {
        type: String,
        required: true
    },
    energyEfficiencyRating: {
        type: String,
        enum: ['A+++', 'A++', 'A+', 'A', 'B', 'C'],
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
});

module.exports = mongoose.model('Climate', ClimateSchema);
