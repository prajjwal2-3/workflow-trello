
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoute from './routes/taskRoute';
import userRoute from './routes/userRoute';
import dotenv from 'dotenv';
dotenv.config();
import { connect_to_db } from './utilities/db.connect';
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.send('Welcome to the Task Manager API')
})
app.use('/api/cards', taskRoute);
app.use('/api/user',userRoute)

app.listen(PORT, async () => {
  try {
    await connect_to_db()
    console.log(`Server is running on ${NODE_ENV === "development" ? "🌿 Development" : "⚡ Production"} Mode at port ${PORT}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    console.log(`🥲 Failed to start the server for ${NODE_ENV === "development" ? "🌿 Development" : "⚡ Production"} Mode at port ${PORT}`);
  }
});
