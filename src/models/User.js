import mongoose from 'mongoose';

import bcrypt from 'bcrypt';


// Create a simple user schema
const userSchema = new mongoose.Schema({
  name: {type:String, required:true},
  role: {type:String, default:"farmer"}, // farmer or center
  mobile: {type:String, required:true},
  password: {type:String, required:true},
  email: String,
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    pin: String,
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;