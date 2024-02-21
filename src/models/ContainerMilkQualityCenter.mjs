
import mongoose from 'mongoose';

const containerMilkQualityCenterSchema = new mongoose.Schema({

    centerId : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    containerId: {type: mongoose.Schema.Types.ObjectId, ref: 'FarmerContainer', required: true },
    containerMilkQualityId: {type: mongoose.Schema.Types.ObjectId, ref: 'ContainerMilkQuality', required: true },  
  
    quantity: { type: Number},
    quality: { type: Object }, 

    storedAtCenter: {type: Boolean, default: false},

    
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  });
  
  const ContainerMilkQualityCenter = mongoose.models.ContainerMilkQualityCenter || mongoose.model('ContainerMilkQualityCenter', containerMilkQualityCenterSchema);
  
  // const ContainerMilkQualityCenter =  mongoose.model('ContainerMilkQualityCenter', containerMilkQualityCenterSchema);
  
  export default ContainerMilkQualityCenter;