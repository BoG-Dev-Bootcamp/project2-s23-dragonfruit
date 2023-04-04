import axios from 'axios'
import animal from '../../../../server/mongodb/models/animal.js'
import animalSchema from "../../../../server/mongodb/models/trainingLog.js"

export default async function handler(req, res) {

    let newAnimalSchemaData = {
        _id: req.body._id,
        name: req.body.name,
        hoursTrained: req.body.hoursTrained,
        owner: req.body.owner,
        dateOfBirth: req.body.dateOfBirth,
        profilePicture: req.body.profilePicture,
    }

    try {
        let newAnimal = new animalSchema(newAnimalSchemaData);
        await newAnimal.save();
        return res.status(200)
    } catch (error) {
        return res.status(400)
    }
}