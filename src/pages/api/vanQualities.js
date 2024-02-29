// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
// import VanQuality from '@/models/VanQuality.mjs';

// import User from '@/models/User';
// import Cow from '@/models/Cow.mjs';
import VanQuality from '@/models/VanQuality.mjs';

connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const vanQuality = await VanQuality.findById(req.query.id);
            // await vanQuality.populate(['cowId'])
            res.status(200).json(vanQuality);
          } catch (error) {
            // console.error(error);
            res.status(404).send('VanQuality not found');
          }
  
        } else {
        try {
          // console.log("Hello World")
          const page = parseInt(req.query.page) || 1;
          const pageSize = parseInt(req.query.pageSize) || 10;
          let query = {}; 

          if (req.query.vanId) {
            // Add a regex search for the nested memberId.name field
            query.vanId = req.query.vanId;
          }

  
          const totalCount = await VanQuality.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const vanQualitys = await VanQuality.find(query)
            .sort({ created: -1 })

              .skip((page - 1) * pageSize)
              // .populate(["cowId"])
              .limit(pageSize);
  
              res.json({
              vanQualitys,
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
          const newVanQuality = new VanQuality(req.body);
          const savedVanQuality = await newVanQuality.save();
          // await savedVanQuality.populate(['cowId',])
  
          res.status(201).json(savedVanQuality);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedVanQuality = await VanQuality.findByIdAndUpdate(id, updatedData, { new: true });
            // await updatedVanQuality.populate(['cowId',])
            res.status(200).json(updatedVanQuality);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedVanQuality = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedVanQuality)
          res.status(200).send({
            "message":"deleted successfully",
            deletedVanQuality
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
  