// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import Cow from '@/models/Cow.mjs';


connectDB();

export default async function handler(req, res) {

  switch (req.method) {
    case 'GET':
      if (req.query.id){
        try {
          const cow = await Cow.findById(req.query.id);
          // await cow.populate(['farmerId'])
          res.status(200).json(cow);
        } catch (error) {
          // console.error(error);
          res.status(404).send('Cow not found');
        }

      } else {
      try {
        // console.log("Hello World")
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        let query = {}; 

        if (req.query.farmerId) {
          query.farmerId = req.query.farmerId;
        }

        const totalCount = await Cow.countDocuments(query);
        const totalPages = Math.ceil(totalCount / pageSize);

        const farmerCows = await Cow.find(query)
        .sort({ created: -1 })

            .skip((page - 1) * pageSize)
            // .populate(['farmerId'])
            .limit(pageSize);

            res.json({
            farmerCows,
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
        

        const lastCow = await Cow.findOne({}, {}, { sort: { 'created': -1 } });

        if (lastCow?.cowNumber) {
          newCow.cowNumber = lastCow.cowNumber+1
        } else {
          newCow.cowNumber = 1 
        }

        const savedCow = await newCow.save();

        

        // await savedCow.populate(['farmerId'])

        res.status(201).json(savedCow);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      break;
    
    case 'PUT':
        try {
          const { id, ...updatedData } = req.body;
          const updatedCow = await Cow.findByIdAndUpdate(id, updatedData, { new: true });
          // await updatedCow.populate(['farmerId'])
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
        // console.log("sdnfkandjka", deletedCow)
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
