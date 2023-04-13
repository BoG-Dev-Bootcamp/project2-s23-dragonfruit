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
            const animalData = await animalSchema.findOne({name: request.body.animal}).lean()

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

            // await animalSchema.updateOne({name: request.body.animal}, animalData.hours + request.body.hours)

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

            return response.send("added");

        } catch (error) {
            console.log(error)
            return response.send("false");
        }

    } else if (request.method == "GET") {
        response.status(400);

        return response.send("Please send a Post request not a Get request")

    } else {
        await closeDB()
        response.status(500)
        console.log(error)
        return response.send("false");
    }
}