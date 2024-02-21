// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import PreProductQuality from '@/models/PreProductQuality';

// connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const preProductQuality = await PreProductQuality.findById(req.query.id);
            await preProductQuality.populate(['centerContainerQualityId'])
            res.status(200).json(preProductQuality);
          } catch (error) {
            // console.error(error);
            res.status(404).send('PreProductQuality not found');
          }
  
        } else {
        try {
          // console.log("Hello World")
          const page = parseInt(req.query.page) || 1;
          const pageSize = parseInt(req.query.pageSize) || 10;
          let query = {}; 
  
          const totalCount = await PreProductQuality.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const preProductQualitys = await PreProductQuality.find(query)
              .skip((page - 1) * pageSize)
              .populate(['centerContainerQualityId',])
              .limit(pageSize);
  
              res.json({
              preProductQualitys,
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
          const newPreProductQuality = new PreProductQuality(req.body);
          const savedPreProductQuality = await newPreProductQuality.save();
          await savedPreProductQuality.populate(['centerContainerQualityId',])
  
          res.status(201).json(savedPreProductQuality);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        res.status(500).send('Provide a valid query');
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedPreProductQuality = await PreProductQuality.findByIdAndUpdate(id, updatedData, { new: true });
            await updatedPreProductQuality.populate(['centerContainerQualityId',])
            res.status(200).json(updatedPreProductQuality);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedPreProductQuality = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedPreProductQuality)
          res.status(200).send({
            "message":"deleted successfully",
            deletedPreProductQuality
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
  