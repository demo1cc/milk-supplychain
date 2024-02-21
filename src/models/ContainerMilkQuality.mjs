import mongoose from 'mongoose';
// import connectDB from '@/utils/db';

// connectDB();
// Create a simple user schema
const containerMilkQualitySchema = new mongoose.Schema({
  centerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false  },
  containerId: {type: mongoose.Schema.Types.ObjectId, ref: 'FarmerContainer', required: true },

  containerMilkQualityId: {type: mongoose.Schema.Types.ObjectId, ref: 'ContainerMilkQuality', required: false },


  place: {type: String}, 

  cowMilkQualityIds : {
    type: Array
  },

  checkedAtCenter: {type: Boolean, default: false },
  storedAtCenter: {type: Boolean, default: false},

  quantity: { type: Number},
  quality: { type: Object }, 
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const ContainerMilkQuality = mongoose.models.ContainerMilkQuality || mongoose.model('ContainerMilkQuality', containerMilkQualitySchema);

// const ContainerMilkQuality =  mongoose.model('ContainerMilkQuality', containerMilkQualitySchema);

export default ContainerMilkQuality;