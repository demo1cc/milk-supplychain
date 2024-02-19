import mongoose from 'mongoose';
import connectDB from '@/utils/db';

connectDB();
// Create a simple user schema
const centerVanSchema = new mongoose.Schema({
  centerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  name: { type: String},
  vehicleNumber: { type: String }, 
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const CenterVan = mongoose.models.CenterVan || mongoose.model('CenterVan', centerVanSchema);

export default CenterVan;