// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import ContainerMilkQuality from '@/models/ContainerMilkQuality.mjs';

connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const containerMilkQuality = await ContainerMilkQuality.findById(req.query.id);
            await containerMilkQuality.populate(['containerId'])
            res.status(200).json(containerMilkQuality);
          } catch (error) {
            // console.error(error);
            res.status(404).send('ContainerMilkQuality not found');
          }
  
        } else {
        try {
          // console.log("Hello World")
          const page = parseInt(req.query.page) || 1;
          const pageSize = parseInt(req.query.pageSize) || 10;
          let query = {}; 

          if (req.query.containerId) {
            query.containerId = req.query.containerId;
          }

          if (req.query.checkedAtCenter) {
            query.checkedAtCenter = req.query.checkedAtCenter;
          }
  
          const totalCount = await ContainerMilkQuality.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const containerMilkQualitys = await ContainerMilkQuality.find(query)
          .sort({ created: -1 })
              .skip((page - 1) * pageSize)
              .populate(["containerId"])
              .limit(pageSize);
  
              res.json({
              containerMilkQualitys,
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
          const newContainerMilkQuality = new ContainerMilkQuality(req.body);
          const savedContainerMilkQuality = await newContainerMilkQuality.save();
          await savedContainerMilkQuality.populate(['containerId',])
  
          res.status(201).json(savedContainerMilkQuality);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        res.status(500).send('Provide a valid query');
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedContainerMilkQuality = await ContainerMilkQuality.findByIdAndUpdate(id, updatedData, { new: true });
            await updatedContainerMilkQuality.populate(['containerId',])
            res.status(200).json(updatedContainerMilkQuality);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedContainerMilkQuality = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedContainerMilkQuality)
          res.status(200).send({
            "message":"deleted successfully",
            deletedContainerMilkQuality
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
  