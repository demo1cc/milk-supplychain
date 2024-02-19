import mongoose from 'mongoose';
import connectDB from '@/utils/db';

connectDB();
// Create a simple user schema
const cowMilkQualitySchema = new mongoose.Schema({
  cowId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cow', required: true },

  quantity: { type: Number},
  quality: { type: Object }, 
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const CowMilkQuality = mongoose.models.CowMilkQuality || mongoose.model('CowMilkQuality', cowMilkQualitySchema);

export default CowMilkQuality;