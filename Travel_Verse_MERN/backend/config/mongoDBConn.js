import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery', false)
export const mongoDBconnect = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
       console.log('mongoDB contected')

    } catch (error) {
        console.log(error)
        
    }
}