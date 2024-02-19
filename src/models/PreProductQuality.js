import mongoose from 'mongoose';
import connectDB from '@/utils/db';

connectDB();
// Create a simple user schema
const preProductQualitySchema = new mongoose.Schema({
  centerContainerQualityId: {type: mongoose.Schema.Types.ObjectId, ref: 'CenterContainerQuality', required: true },

  productName : {type: String}, 
  
  quantity: { type: Number},
  quality: { type: Object }, 
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const PreProductQuality = mongoose.models.PreProductQuality || mongoose.model('PreProductQuality', preProductQualitySchema);

export default PreProductQuality;