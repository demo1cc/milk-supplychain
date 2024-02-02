// pages/api/Blogs.js
import mongoose from 'mongoose';
import connectDB from '@/utils/db';

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
// });


connectDB();
// Create a simple Blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  detail: String,
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const Blogs = await Blog.find();
        res.status(200).json(Blogs);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      break;
    case 'POST':
      try {
        const { title, detail } = req.body;
        const newBlog = new Blog({ title, detail });
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
      break;
    case 'DELETE':
        try {
          const { id } = req.body;
          await Blog.findByIdAndDelete(id);
          res.status(204).send();
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        break;
    default:
      res.status(405).send('Method Not Allowed');
  }
}
