import mongoose from "mongoose"
import trainingLogSchema from "../../../../server/mongodb/models/trainingLog.js"
import userSchema from "../../../../server/mongodb/models/user.js"
import animalSchema from "../../../../server/mongodb/models/animal.js"
import { connectDB, closeDB } from "../../../../server/utils/db.js"
import clientauth from "../user/clientauth.js"

export default async function handler(request, response) {
    const authenticate = clientauth(request.cookies.token) 
    console.log(authenticate._id)

    if(authenticate == false) {
        return res.send("redirect")
    }
    if (request.method == "POST") {
        try {

            await connectDB()

            console.log(request.body.animal)
            const animalData = await AnimalSchema.findOne({name: request.body.animal}).lean()
            const trainingLogData = {
                date: new Date(request.body.date),
                description: request.body.description,
                hours: request.body.hours,
                animal: new mongoose.Types.ObjectId(animalData._id),
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

            await animalSchema.updateOne( { _id: trainingLogData.animal }, { $inc: { hoursTrained: trainingLogData.hours } } )

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
        console.log(error)
        return response.send("Something has gone wrong!");
    }
}