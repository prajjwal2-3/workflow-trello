import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const CONNECTION_STRING = process.env.MONGODB_URI;

export const connect_to_db = async () => {
    try {
        const dbConnection = await mongoose.connect('mongodb+srv://prajjwalbh25:AtZMTaWRJWT6uRl1@cluster0.rbysjio.mongodb.net/trello');
        console.log(`Connected to Database\nDatabase Name: ${dbConnection.connection.db.databaseName}`);
    } catch (error) {
        console.log(error)
        return null
    }
}