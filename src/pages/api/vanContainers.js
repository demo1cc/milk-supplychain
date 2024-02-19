// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import VanContainer from '@/models/VanContainer';

connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const vanContainer = await VanContainer.findById(req.query.id);
            await vanContainer.populate(['farmerId'])
            res.status(200).json(vanContainer);
          } catch (error) {
            // console.error(error);
            res.status(404).send('VanContainer not found');
          }
  
        } else {
        try {
          // console.log("Hello World")
          const page = parseInt(req.query.page) || 1;
          const pageSize = parseInt(req.query.pageSize) || 10;
          let query = {}; 
  
          const totalCount = await VanContainer.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const vanContainers = await VanContainer.find(query)
              .skip((page - 1) * pageSize)
              .populate(['farmerId',])
              .limit(pageSize);
  
              res.json({
              vanContainers,
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
          const newVanContainer = new VanContainer(req.body);
          const savedVanContainer = await newVanContainer.save();
          await savedVanContainer.populate(['farmerId',])
  
          res.status(201).json(savedVanContainer);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        res.status(500).send('Provide a valid query');
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedVanContainer = await VanContainer.findByIdAndUpdate(id, updatedData, { new: true });
            await updatedVanContainer.populate(['farmerId',])
            res.status(200).json(updatedVanContainer);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedVanContainer = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedVanContainer)
          res.status(200).send({
            "message":"deleted successfully",
            deletedVanContainer
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
  