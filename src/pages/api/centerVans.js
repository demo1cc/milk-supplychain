// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import CenterVan from '@/models/CenterVan';

connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const centerVan = await CenterVan.findById(req.query.id);
            await centerVan.populate(["centerId"])
            res.status(200).json(centerVan);
          } catch (error) {
            // console.error(error);
            res.status(404).send('CenterVan not found');
          }
  
        } else {
        try {
          // console.log("Hello World")
          const page = parseInt(req.query.page) || 1;
          const pageSize = parseInt(req.query.pageSize) || 10;
          let query = {}; 

          if (req.query.centerId) {
            query.centerId = req.query.centerId;
          }
          
  
          const totalCount = await CenterVan.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const centerVans = await CenterVan.find(query)
              .skip((page - 1) * pageSize)
              .populate(["centerId"])
              .limit(pageSize);
  
              res.json({
              centerVans,
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
          const newCenterVan = new CenterVan(req.body);
          const savedCenterVan = await newCenterVan.save();
          await savedCenterVan.populate(["centerId"])
  
          res.status(201).json(savedCenterVan);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        res.status(500).send('Provide a valid query');
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedCenterVan = await CenterVan.findByIdAndUpdate(id, updatedData, { new: true });
            await updatedCenterVan.populate(["centerId"])
            res.status(200).json(updatedCenterVan);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedCenterVan = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedCenterVan)
          res.status(200).send({
            "message":"deleted successfully",
            deletedCenterVan
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
  