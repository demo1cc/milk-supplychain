import mongoose from 'mongoose';
// import connectDB from '@/utils/db';

// connectDB();
// Create a simple user schema
const productQualitySchema = new mongoose.Schema({
  centerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  preProductQualityId: {type: mongoose.Schema.Types.ObjectId, ref: 'PreProductQuality', required: true },

  productName : {type: String}, 
  
  quantity: { type: Number},
  quality: { type: Object }, 
  
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const ProductQuality = mongoose.models.ProductQuality || mongoose.model('ProductQuality', productQualitySchema);
// const ProductQuality =  mongoose.model('ProductQuality', productQualitySchema);

export default ProductQuality;