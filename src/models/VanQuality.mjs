import mongoose from 'mongoose';
// import connectDB from '@/utils/db';

// connectDB();
// Create a simple user schema
const vanQualitySchema = new mongoose.Schema({
  vanId: {type: mongoose.Schema.Types.ObjectId, ref: 'CenterVan', required: true },

  quantity: { type: Number},
  quality: { type: Object }, 
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const VanQuality = mongoose.models.VanQuality || mongoose.model('VanQuality', vanQualitySchema);

// const VanQuality =  mongoose.model('VanQuality', VanQualitySchema);

export default VanQuality;
