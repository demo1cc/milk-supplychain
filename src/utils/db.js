// db.js
import mongoose from 'mongoose';

// let isConnected;

const connectDB = async () => {
  // if (isConnected) {
  //   console.log('Using existing database connection');
  //   return;
  // }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('Connected to MongoDB');
    // isConnected = true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error
  }
};

export default connectDB;
