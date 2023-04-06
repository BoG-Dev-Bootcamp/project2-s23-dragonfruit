import mongoose from "mongoose"
import trainingLogSchema from "../../../../server/mongodb/models/trainingLog.js"
import { connectDB, closeDB } from "../../../../server/utils/db.js"

export default async function handler(request, response) {
    if (request.method == "POST") {
        try {

            await connectDB()

            const trainingLogData = {
                _id: request.body.id,
                date: request.body.date,
                description: request.body.description,
                hours: request.body.hours,
                animal: request.body.animal,
                user: request.body.user,
                trainingLogVideo: request.body.trainingLogVideo,
            }

            const newTrainingLog = new trainingLogSchema(trainingLogData)
            await newTrainingLog.save()
            
            await closeDB()

            response.status(200)

            return response.send("Training log successfully added");

        } catch (error) {
            await closeDB()
            response.status(400)
            return response.send("There has been an error! Please reload the page and try again.")
        }

    } else {
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
    }
}