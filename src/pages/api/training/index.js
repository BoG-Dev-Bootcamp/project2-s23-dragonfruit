import mongoose from "mongoose"
import trainingLogSchema from "../../../../server/mongodb/models/trainingLog.js"
import userSchema from "../../../../server/mongodb/models/user.js"
import { connectDB, closeDB } from "../../../../server/utils/db.js"
import auth from "../user/auth.js"

export default async function handler(request, response) {
    const authenticate = auth(request, response) 
    console.log(authenticate._id)

    if (request.method == "POST") {
        try {

            await connectDB()

            const trainingLogData = {
                date: new Date(request.body.date),
                description: request.body.description,
                hours: request.body.hours,
                animal: new mongoose.Types.ObjectId(request.body.animal),
                user: new mongoose.Types.ObjectId(authenticate._id),
                // user: new mongoose.Types.ObjectId(request.body.user),
                trainingLogVideo: request.body.trainingLogVideo,
            }

            const userData = await userSchema.findOne(trainingLogData.user).lean()

            if (typeof userData === null) {
                throw new Error("User does not exist!")

            } else {
                let found = false

                for (let i = 0; i < userData.animalArray.length; i++) {
                    if (trainingLogData.animal.equals(userData.animalArray[i])) {
                        found = true
                        break
                    }
                }

                if (!found) {
                    throw new Error("User does not own this animal!")
                }
            }

            const newTrainingLog = new trainingLogSchema(trainingLogData)
            await newTrainingLog.save()
            
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

        return response.send("Please send a Post request not a Get request")

    } else {
        await closeDB()
        response.status(500)
        return response.send("Something has gone wrong!");
    }
}