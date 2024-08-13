const mongoose = require('mongoose');

const uri = "mongodb+srv://reddysai:swyft@cluster0.ekusftb.mongodb.net/swyftdb?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      connectTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 30000,  // 30 seconds
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
