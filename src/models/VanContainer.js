import mongoose from 'mongoose';
import connectDB from '@/utils/db';

connectDB();
// Create a simple user schema
const vanContainerSchema = new mongoose.Schema({
  vanId: {type: mongoose.Schema.Types.ObjectId, ref: 'CenterVan', required: true },

  containerIds: {type: Array},  
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const VanContainer = mongoose.models.VanContainer || mongoose.model('VanContainer', vanContainerSchema);

export default VanContainer;