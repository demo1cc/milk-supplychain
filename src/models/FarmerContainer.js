import mongoose from 'mongoose';
import connectDB from '@/utils/db';



connectDB();
// Create a simple user schema
const farmerContainerSchema = new mongoose.Schema({
  farmerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  capacity: { type: Number,}, 
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const FarmerContainer = mongoose.models.FarmerContainer || mongoose.model('FarmerContainer', farmerContainerSchema);

export default FarmerContainer;