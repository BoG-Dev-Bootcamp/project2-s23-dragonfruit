import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', false);

let dbConnection

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_URL, {
            dbName: process.env.DB_NAME,
        })
        dbConnection = mongoose.connection.db.collection('users')
        console.log("Sucessfully connected to the database!")
        
        
    } catch (e) {
        console.log("Failed to connect to the database :(")
    }
}

const closeDB = async () => {
    await mongoose.connection.close();
    console.log("Connection Closed.");
}




export { connectDB, closeDB };