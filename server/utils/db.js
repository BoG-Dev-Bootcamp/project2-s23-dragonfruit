import mongoose from "mongoose";
// import * as dotenv from 'dotenv'

// dotenv.config()
// if (mongoose.connections[0].readyState) return;

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        console.log(process.env.DB_URL)
        await mongoose.connect(process.env.DB_URL, {
            dbName: process.env.DB_NAME,
            // useMongoClient: true,
            // keepAlive: true,
        })

        console.log("Sucessfully connected to the database!")

    } catch (e) {
        console.log(e)
        console.log("Failed to connect to the database :(")
    }
}

const closeDB = async () => {
    await mongoose.connection.close();
    console.log("Connection Closed.");
}
export { connectDB, closeDB };