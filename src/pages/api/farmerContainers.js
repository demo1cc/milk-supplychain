// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import FarmerContainer from '@/models/FarmerContainer';

// connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const farmerContainer = await FarmerContainer.findById(req.query.id);
            await farmerContainer.populate(['farmerId'])
            res.status(200).json(farmerContainer);
          } catch (error) {
            // console.error(error);
            res.status(404).send('FarmerContainer not found');
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
          const totalCount = await FarmerContainer.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const farmerContainers = await FarmerContainer.find(query)
              .skip((page - 1) * pageSize)
              .populate(['farmerId',])
              .limit(pageSize);
  
              res.json({
              farmerContainers,
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
          const newFarmerContainer = new FarmerContainer(req.body);
          const savedFarmerContainer = await newFarmerContainer.save();
          await savedFarmerContainer.populate(['farmerId',])
  
          res.status(201).json(savedFarmerContainer);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        res.status(500).send('Provide a valid query');
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedFarmerContainer = await FarmerContainer.findByIdAndUpdate(id, updatedData, { new: true });
            await updatedFarmerContainer.populate(['farmerId',])
            res.status(200).json(updatedFarmerContainer);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedFarmerContainer = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedFarmerContainer)
          res.status(200).send({
            "message":"deleted successfully",
            deletedFarmerContainer
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
  