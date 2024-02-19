import mongoose from 'mongoose';
import connectDB from '@/utils/db';



connectDB();
// Create a simple user schema
const centerFarmerSchema = new mongoose.Schema({
  centerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const CenterFarmer = mongoose.models.CenterFarmer || mongoose.model('CenterFarmer', centerFarmerSchema);

export default CenterFarmer;