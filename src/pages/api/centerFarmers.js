// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import CenterFarmer from '@/models/CenterFarmer.mjs';
import User from '@/models/User.mjs';

connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const centerFarmer = await CenterFarmer.findById(req.query.id);
            await centerFarmer.populate(['farmerId', "centerId"])
            res.status(200).json(centerFarmer);
          } catch (error) {
            // console.error(error);
            res.status(404).send('CenterFarmer not found');
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
          
          const totalCount = await CenterFarmer.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const centerFarmers = await CenterFarmer.find(query)
              .sort({ created: -1 })
              .skip((page - 1) * pageSize)
              .populate(['farmerId', "centerId"])
              .limit(pageSize);
  
              res.json({
              centerFarmers,
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
          const newCenterFarmer = new CenterFarmer(req.body);
          const savedCenterFarmer = await newCenterFarmer.save();
          await savedCenterFarmer.populate(['farmerId', "centerId"])
  
          res.status(201).json(savedCenterFarmer);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedCenterFarmer = await CenterFarmer.findByIdAndUpdate(id, updatedData, { new: true });
            await updatedCenterFarmer.populate(['farmerId', "centerId"])
            res.status(200).json(updatedCenterFarmer);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedCenterFarmer = await CenterFarmer.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedCenterFarmer)
          res.status(200).send({
            "message":"deleted successfully",
            deletedCenterFarmer
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
  