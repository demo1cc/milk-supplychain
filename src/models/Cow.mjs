import mongoose from 'mongoose';
// import connectDB from '@/utils/db';



// connectDB();
// Create a simple user schema
const cowsSchema = new mongoose.Schema({
  farmerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cowNumber: {type: Number},
  food: {type:String},
  milkingSystem: {type:String}, // manual or robotics
  breed: {type:String},
  age: {type:Number}, 
  milkCycle: {type: Number}, // month
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});



const Cow = mongoose.models.Cow || mongoose.model('Cow', cowsSchema);

// const Cow =  mongoose.model('Cow', cowsSchema);

 export default Cow;