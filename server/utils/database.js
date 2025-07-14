const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/weatherdb';
        await mongoose.connect(mongoURI, {
    });
    console.log('first connection to MongoDB successful');
}catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

const disconnectDB = async () => {
    try{
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
}

module.exports ={
    connectDB,
    disconnectDB
}