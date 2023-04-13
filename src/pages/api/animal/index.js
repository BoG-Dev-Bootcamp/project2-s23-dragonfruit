import mongoose from "mongoose"
import animalSchema from "../../../../server/mongodb/models/animal.js"
import userSchema from "../../../../server/mongodb/models/user.js"
import {connectDB, closeDB} from "../../../../server/utils/db.js"
import clientauth from "../user/clientauth.js"

export default async function handler(req, res) {
    //const authenticate = auth(req, res) 
    const authenticate = clientauth(req.cookies.token)



    if(authenticate == false) {
        return res.send("redirect")
    }
    if (req.method == 'POST') {
        console.log(req.body) 
        let newAnimalSchemaData = {
            
            name: req.body.name,
            hoursTrained: req.body.hoursTrained,
            //owner: new mongoose.Types.ObjectId(authenticate._id),
            owner: new mongoose.Types.ObjectId(authenticate._id),
            dateOfBirth: new Date(req.body.dateOfBirth),
            profilePicture: req.body.profilePicture,
        }

        try {
            await connectDB()

            const userData = await userSchema.findOne(newAnimalSchemaData.owner).lean()


            try{
            userData.animalArray.forEach(async animal => {
                const aData = await animalSchema.findOne(animal).lean()
                if (aData != null && aData.name == req.body.name) {
                    console.log("same name")
                    throw new Error("Same Name")
                }
            })
            } catch (error) {
                return res.send("Error creating animal")
            }

            if (!sameName) {
                let newAnimal = new animalSchema(newAnimalSchemaData);


                if (typeof userData === null) {
                    throw new Error("Owner user does not exist!")
    
                } else {
                    await userSchema.updateOne({ _id : userData._id }, { $push: { animalArray: newAnimal._id } })
                }
    
                await newAnimal.save();
    
                console.log("closed")
            }
            
            return res.status(200).send("created")

        } catch (error) {
            //console.log(error)
            //REMOVED STATUS CODES BECAUSE HANDLED BY FRONTEND
            return res.send("Error creating animal")
        }
    } else {
        return res.status(500).send("Server error")
    }
}
