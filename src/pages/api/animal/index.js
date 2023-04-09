import mongoose from "mongoose"
import animalSchema from "../../../../server/mongodb/models/animal.js"
import userSchema from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import auth from "../user/auth.js"

export default async function handler(req, res) {
    const authenticate = auth(request, response) 

    if (req.method == 'POST') {
        let newAnimalSchemaData = {
            name: req.body.name,
            hoursTrained: req.body.hoursTrained,
            owner: new mongoose.Types.ObjectId(authenticate._id),
            // owner: new mongoose.Types.ObjectId(req.body.owner),
            dateOfBirth: new Date(req.body.dateOfBirth),
            profilePicture: req.body.profilePicture,
        }

        try {
            await connectDB()

            let newAnimal = new animalSchema(newAnimalSchemaData);

            const userData = await userSchema.findOne(newAnimalSchemaData.owner).lean()

            if (typeof userData === null) {
                throw new Error("Owner user does not exist!")

            } else {
                await userSchema.updateOne({ _id : userData._id }, { $push: { animalArray: newAnimal._id } })
            }

            await newAnimal.save();

            await closeDB()
            console.log("closed")
            return res.status(200).send("New animal created")

        } catch (error) {
            await closeDB()
            console.log(error)
            return res.status(400).send("Error creating animal")
        }
    } else {
        await closeDB()
        return res.status(500).send("Server error")
    }
}
