const mongoose = require('mongoose');
const favoriteCitySchema = new mongoose.Schema({

    city : {
        type: String,
        required: true,
        trim: true,
    },
    weather: {
        temp: Number,
        condition: String,},
    
    user: {
        type: string,
        required: true, 
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const FavoriteCity = mongoose.model('FavoriteCity', favoriteCitySchema);
module.exports = FavoriteCity;