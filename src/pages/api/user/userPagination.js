import animalSchema from "../../../../server/mongodb/models/animal.js"
import userSchema from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import clientauth from "./clientauth.js"
import mongoose from "mongoose"




async function getAllElements(animalArray) {

    const wholeArray = []
    const updatedAnimalArray = []

    for (const element of animalArray) {
        const animalData = await animalSchema.findOne(element).lean()
        if (animalData != null) {
            const tempDate = new Date(animalData.dateOfBirth)
            wholeArray.push({name: animalData.name, dob: tempDate, hoursTrained: animalData.hoursTrained, pfp: animalData.profilePicture})
            updatedAnimalArray.push(element)
        }
    }

    return {wholeArray, updatedAnimalArray}
}


export default async function handler(req, res) {
    //const authenticate = auth(req, res) 
    const authenticate = clientauth(req.cookies.token)
    if (authenticate == false) {
        return res.send("redirect")
    }
    if (req.method == 'GET') {

        try {
            await connectDB()

            const user = new mongoose.Types.ObjectId(authenticate._id)
            const userData = await userSchema.findOne(user).lean()

            const animalArray = userData.animalArray
            
            let {wholeArray, updatedAnimalArray} = await getAllElements(animalArray)

            await userSchema.updateOne({_id: user}, {animalArray: updatedAnimalArray})
            
            return res.status(200).send(wholeArray)

        } catch (error) {
            return res.send("Null")
        }
    } else {
        await closeDB()
        return res.status(500).send("Server error")
    }
}
