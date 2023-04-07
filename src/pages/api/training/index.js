import mongoose from "mongoose"
import trainingLogSchema from "../../../../server/mongodb/models/trainingLog.js"
import { connectDB, closeDB } from "../../../../server/utils/db.js"

export default async function handler(request, response) {
    if (request.method == "POST") {
        try {

            await connectDB()

            console.log("before")
            const trainingLogData = {
                _id: new mongoose.Types.ObjectId(),
                date: new Date(request.body.date),
                description: request.body.description,
                hours: request.body.hours,
                // animal: request.body.animal,
                animal: new mongoose.Types.ObjectId(request.body.animal),
                // user: request.body.user,
                user: new mongoose.Types.ObjectId(request.body.user),
                trainingLogVideo: request.body.trainingLogVideo,
            }

            console.log("created structure correctly")

            // if (animal)

            const newTrainingLog = new trainingLogSchema(trainingLogData)
            console.log("created schema instance correctly")
            await newTrainingLog.save()
            console.log("saved correctly")
            
            await closeDB()

            response.status(200)

            return response.send("Training log successfully added");

        } catch (error) {
            console.log(error)
            await closeDB()
            response.status(400)
            return response.send("There is incorrect data in the post request");
        }

    } else if (request.method == "GET") {
        /*
        await connectDB()

        const trainingLogData = {
            _id: 100,
            date: Date(),
            description: "This log teaches a cat how to sit",
            hours: 1,
            animal: new mongoose.Types.ObjectId(),
            user: new mongoose.Types.ObjectId(),
            trainingLogVideo: null,
        }

        const newTrainingLog = new trainingLogSchema(trainingLogData)
        await newTrainingLog.save()
        await closeDB()
        */
        
        response.status(400);

        return response.send("Please send a post request not a Get request")

    } else {
        response.status(500)
        return response.send("Something has gone wrong!");
    }
}