// pages/api/users.js
// import mongoose from 'mongoose';
import connectDB from '@/utils/db';

// import bcrypt from 'bcrypt';
import User from '@/models/User';

var jwt = require('jsonwebtoken');


connectDB();



export default async function handler(req, res) {

  switch (req.method) {
    case 'GET':
      if (req.query.id){
        try {
          const updatedUser = await User.findById(req.query.id);
          res.status(200).json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(404).send('User not found');
        }

      } else {
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
      }
      break;
    case 'POST':

      if (req.query.type=="create-user"){
      try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      } 

      else if (req.query.type=="login"){
        // console.log("login requested")

        try {
          const { mobile, password } = req.body;
          // console.log(username, password);
          const user = await User.findOne({ mobile });
      
          // console.log(user);
      
          if (!user) return res.status(401).json({ message: 'Invalid credentials' });
      
          const isPasswordValid = await user.comparePassword(password);
      
          if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });
      
          const token = jwt.sign({ mobile: user.mobile, userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d', // Token expires in 1 hour
          });
      
          res.json({ token, user });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

      res.status(500).send('Provide a valid query');


      break;
    
    case 'PUT':
        try {
          const { id, ...updatedData } = req.body;
          const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
          res.status(200).json(updatedUser);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        break;

    case 'DELETE':
      try {
        const { id } = req.body;
        let deletedUser = await User.findByIdAndDelete(id);
        console.log("sdnfkandjka", deletedUser)
        res.status(200).send({
          "message":"deleted successfully",
          deletedUser
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      break;

    default:
      res.status(405).send('Method Not Allowed');
  }
}
