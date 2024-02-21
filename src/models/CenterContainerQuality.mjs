import mongoose from 'mongoose';
// import connectDB from '@/utils/db';

// connectDB();
// Create a simple user schema
const centerContainerQualitySchema = new mongoose.Schema({
  centerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },


  containerIds : {
    type: Array
  },

  quantity: { type: Number},
  quality: { type: Object }, 
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const CenterContainerQuality = mongoose.models.CenterContainerQuality || mongoose.model('CenterContainerQuality', centerContainerQualitySchema);

// const CenterContainerQuality = mongoose.model('CenterContainerQuality', centerContainerQualitySchema);

export default CenterContainerQuality;