// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import Cows from '@/models/Cows';


connectDB();

export default async function handler(req, res) {

  switch (req.method) {
    case 'GET':
      if (req.query.id){
        try {
          const updatedCow = await Cow.findById(req.query.id);
          res.status(200).json(updatedCow);
        } catch (error) {
          console.error(error);
          res.status(404).send('Cow not found');
        }

      } else {
      try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        let query = {}; 

        const totalCount = await Cow.countDocuments(query);
        const totalPages = Math.ceil(totalCount / pageSize);

        const users = await Cow.find(query)
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
      try {
        const newCow = new Cow(req.body);
        const savedCow = await newCow.save();
        res.status(201).json(savedCow);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      res.status(500).send('Provide a valid query');
      break;
    
    case 'PUT':
        try {
          const { id, ...updatedData } = req.body;
          const updatedCow = await Cow.findByIdAndUpdate(id, updatedData, { new: true });
          res.status(200).json(updatedCow);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        break;

    case 'DELETE':
      try {
        const { id } = req.body;
        let deletedUser = await User.findByIdAndDelete(id);
        console.log("sdnfkandjka", deletedCow)
        res.status(200).send({
          "message":"deleted successfully",
          deletedCow
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
