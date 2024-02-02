// pages/api/users.js
import mongoose from 'mongoose';
import connectDB from '@/utils/db';

connectDB();
// Create a simple user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default async function handler(req, res) {

  switch (req.method) {
    case 'GET':
      try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        let query = {}; 

        const totalCount = await User.countDocuments(query);
        const totalPages = Math.ceil(totalCount / pageSize);

        const users = await User.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

            res.json({
            users,
            page,
            pageSize,
            totalCount,
            totalPages,
      });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      break;
    case 'POST':
      try {
        const { username, email } = req.body;
        const newUser = new User({ username, email });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      break;
    default:
      res.status(405).send('Method Not Allowed');
  }
}
