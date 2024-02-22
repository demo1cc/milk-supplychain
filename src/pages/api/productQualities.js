// import mongoose from 'mongoose';
import connectDB from '@/utils/db';
import ProductQuality from '@/models/ProductQuality.mjs';

// connectDB();


export default async function handler(req, res) {

    switch (req.method) {
      case 'GET':
        if (req.query.id){
          try {
            const productQuality = await ProductQuality.findById(req.query.id);
            // await productQuality.populate(['preProductQualityId'])
            res.status(200).json(productQuality);
          } catch (error) {
            // console.error(error);
            res.status(404).send('ProductQuality not found');
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
          
  
          const totalCount = await ProductQuality.countDocuments(query);
          const totalPages = Math.ceil(totalCount / pageSize);
  
          const productQualitys = await ProductQuality.find(query)
          .sort({ created: -1 })

              .skip((page - 1) * pageSize)
              // .populate(['preProductQualityId',])
              .limit(pageSize);
  
              res.json({
              productQualitys,
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
          const newProductQuality = new ProductQuality(req.body);
          const savedProductQuality = await newProductQuality.save();
          // await savedProductQuality.populate(['preProductQualityId',])
  
          res.status(201).json(savedProductQuality);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        res.status(500).send('Provide a valid query');
        break;
      
      case 'PUT':
          try {
            const { id, ...updatedData } = req.body;
            const updatedProductQuality = await ProductQuality.findByIdAndUpdate(id, updatedData, { new: true });
            // await updatedProductQuality.populate(['preProductQualityId',])
            res.status(200).json(updatedProductQuality);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
          break;
  
      case 'DELETE':
        try {
          const { id } = req.body;
          let deletedProductQuality = await User.findByIdAndDelete(id);
          // console.log("sdnfkandjka", deletedProductQuality)
          res.status(200).send({
            "message":"deleted successfully",
            deletedProductQuality
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
  