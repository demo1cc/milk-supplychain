// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import CenterContainerQuality from '@/models/CenterContainerQuality.mjs';

connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const centerContainerQuality = await CenterContainerQuality.findById(req.query.id);
            // await centerContainerQuality.populate(['centerId'])
            res.status(200).json(centerContainerQuality);
          } catch (error) {
            // console.error(error);
            res.status(404).send('CenterContainerQuality not found');
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

  
          const totalCount = await CenterContainerQuality.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const centerContainerQualitys = await CenterContainerQuality.find(query)
              .sort({ created: -1 })
              .skip((page - 1) * pageSize)
              // .populate(["centerId"])
              .limit(pageSize);
  
              res.json({
              centerContainerQualitys,
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
          const newCenterContainerQuality = new CenterContainerQuality(req.body);
          const savedCenterContainerQuality = await newCenterContainerQuality.save();
          // await savedCenterContainerQuality.populate(['centerId',])
  
          res.status(201).json(savedCenterContainerQuality);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedCenterContainerQuality = await CenterContainerQuality.findByIdAndUpdate(id, updatedData, { new: true });
            // await updatedCenterContainerQuality.populate(['centerId',])
            res.status(200).json(updatedCenterContainerQuality);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedCenterContainerQuality = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedCenterContainerQuality)
          res.status(200).send({
            "message":"deleted successfully",
            deletedCenterContainerQuality
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
  