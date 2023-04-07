import mongoose from "mongoose";

mongoose.set('strictQuery', false);

let dbConnection

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: process.env.DB_NAME,
        })
        console.log('hi')

        dbConnection = mongoose.connection.db.collection('users')
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