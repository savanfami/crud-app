import  mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbURI = process.env.MONGO_URL;

export const connect=mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));


