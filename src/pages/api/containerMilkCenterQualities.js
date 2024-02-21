// import mongoose from 'mongoose';
// import connectDB from '@/utils/db';
import ContainerMilkQualityCenter from '@/models/ContainerMilkQualityCenter';

// connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const containerMilkQualityCenter = await ContainerMilkQualityCenter.findById(req.query.id);
            // await containerMilkQualityCenter.populate(['containerId'])
            res.status(200).json(containerMilkQualityCenter);
          } catch (error) {
            // console.error(error);
            res.status(404).send('ContainerMilkQualityCenter not found');
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

  
          const totalCount = await ContainerMilkQualityCenter.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const containerMilkQualityCenters = await ContainerMilkQualityCenter.find(query)
               .sort({ created: -1 })
              .skip((page - 1) * pageSize)
            //   .populate(["containerId"])
              .limit(pageSize);
  
              res.json({
              containerMilkQualityCenters,
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
          const newContainerMilkQualityCenter = new ContainerMilkQualityCenter(req.body);
          const savedContainerMilkQualityCenter = await newContainerMilkQualityCenter.save();
        //   await savedContainerMilkQualityCenter.populate(['containerId',])
  
          res.status(201).json(savedContainerMilkQualityCenter);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        res.status(500).send('Provide a valid query');
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedContainerMilkQualityCenter = await ContainerMilkQualityCenter.findByIdAndUpdate(id, updatedData, { new: true });
            // await updatedContainerMilkQualityCenter.populate(['containerId',])
            res.status(200).json(updatedContainerMilkQualityCenter);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedContainerMilkQualityCenter = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedContainerMilkQualityCenter)
          res.status(200).send({
            "message":"deleted successfully",
            deletedContainerMilkQualityCenter
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