import mongoose from 'mongoose';
import connectDB from '@/utils/db';



connectDB();
// Create a simple user schema
const cowsSchema = new mongoose.Schema({
  farmerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  food: {type:String},
  milkingSystem: {type:String},
  breed: {type:String},
  age: {type:Number},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Cow = mongoose.models.Cow || mongoose.model('Cow', cowsSchema);

 export default Cows;