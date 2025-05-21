import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
     const conn  = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected to the database ${conn.connection.host}`)
    } catch (error) {
        console.log("error connecting to database",error);
        
    }
}