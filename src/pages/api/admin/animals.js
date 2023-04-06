import mongoose from 'mongoose'
import Animal from '../../../../server/mongodb/models/animal.js'
import {connectDB, closeDB} from "../../../../server/utils/db.js"

export default async function handler(req, res) {
    try {
        await connectDB()
        let animals = await Animal.find()
        await closeDB()
        console.log(animals)
        return res(200).send(animals)
    } catch (error) {
        return res(500).json(error)
    }
}